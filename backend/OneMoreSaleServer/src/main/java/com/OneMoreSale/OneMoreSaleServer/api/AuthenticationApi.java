package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.HttpUtil;
import com.OneMoreSale.OneMoreSaleServer.model.Credential;
import com.OneMoreSale.OneMoreSaleServer.model.ResponseWrapper;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import com.OneMoreSale.OneMoreSaleServer.service.AuthenticationService;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
public class AuthenticationApi {
    @Autowired
    private AuthenticationService authenticationService;

    private static Logger logger = LoggerFactory.getLogger(AuthenticationApi.class);

    @Autowired
    private SessionFactory sessionFactory;

    /**
     * TODO: .../register 需要阻止已存在的email进行二次注册
     */


    @PostMapping("/register")
    @ResponseBody
    public ResponseWrapper register(@RequestBody @NonNull User user, HttpServletResponse response
    ) throws IOException {
        // sanity check
        if (user == null || user.getAccount().getEmail() == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "please input data");
            return new ResponseWrapper("Illegal Input");
        }
        // 检查是否email已存在
        int userId = authenticationService.getUserIdByEmail(user.getAccount().getEmail());
        if (userId != -1) {
            response.sendError(HttpServletResponse.SC_CONFLICT, "User Existed");
            return new ResponseWrapper("Failed: User Existed");
        }
        // 成功注册
        authenticationService.register(user);
        userId = authenticationService.getUserIdByEmail(user.getAccount().getEmail());
        logger.info("[registered] user {} registered!", userId);
       //  .info, warn, debug, error, ...

        return new ResponseWrapper("Success");
    }


    /**
     * 传入格式：
     * {
     * "email":"ming@gmail.com",
     * "password":"1234567"
     * }
     */
    // createPost() {
    //  if ()
    // }


    @PostMapping("/login")
    @ResponseBody
    public ResponseWrapper login(@RequestBody @NonNull Credential credential, HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 验证用户是否已登陆
        // *update: 需求改变 --> 如果已有用户登陆，则登陆新用户

        // 验证用户邮箱和密码是否匹配
        if (!authenticationService.validateCredential(credential)) {    // wrong credential or not exist
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Wrong username or password");
            logger.info("[Login] user {} logged in failed due to wrong credential", credential.getEmail());
            return new ResponseWrapper("Authentication Failed");
        }

        // 登陆成功，为用户的登陆状态生成session
        if (!HttpUtil.sessionInvalid(request)) {
            logger.info("[Logout] user {} logout due to new user logged in", request.getSession().getAttribute("user_id"));
        }
        HttpSession session = request.getSession();
        session.setAttribute("user_id", authenticationService.getUserIdByEmail(credential.getEmail()));
        session.setAttribute("email", credential.getEmail());
        logger.info("[Login] user {} logged in", credential.getEmail());
        return new ResponseWrapper("Success");
    }

    @PostMapping("/logout")
    @ResponseBody
    public ResponseWrapper logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (HttpUtil.sessionInvalid(request)) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return new ResponseWrapper("no user logged in yet");
        }
        HttpSession session = request.getSession();
        Integer uid = (Integer) session.getAttribute("user_id");
        session.invalidate();   // logout
        logger.info("[Logout] user {} logged out", uid);
        return new ResponseWrapper("Success");
    }
}





