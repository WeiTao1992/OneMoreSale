package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.HttpUtil;
import com.OneMoreSale.OneMoreSaleServer.model.Account;
import com.OneMoreSale.OneMoreSaleServer.model.Credential;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import com.OneMoreSale.OneMoreSaleServer.service.AuthenticationService;
import org.apache.coyote.Response;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

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
    public String register(@RequestBody @NonNull User user, HttpServletResponse response
    ) throws IOException {
        // sanity check

        if (user == null || user.getAccount().getEmail() == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "please input data");
            return "Register Failed";
        }
        // 检查是否email已存在
        int userId = authenticationService.getUserIdByEmail(user.getAccount().getEmail());
        if (userId != -1) {
            response.sendError(HttpServletResponse.SC_CONFLICT, "user existed");
            return "Register Failed";
        }
        // 成功注册
        authenticationService.register(user);
        logger.info("[registered] user {} registered!", userId);
        return "Register Success";
    }


    /**
     * 传入格式：
     * {
     * "email":"ming@gmail.com",
     * "password":"1234567"
     * }
     */
    @PostMapping("/login")
    @ResponseBody
    public void login(@RequestBody @NonNull Credential credential, HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 验证用户是否已登陆
        if (!HttpUtil.sessionInvalid(request)) {    // already logged in
            response.getWriter().print("user already logged in");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // 验证用户邮箱和密码是否匹配
        if (!authenticationService.validateCredential(credential)) {    // wrong credential or not exist
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Wrong username or password");
            return;
        }

        // 登陆成功，为用户的登陆状态生成session
        HttpSession session = request.getSession();
        session.setAttribute("user_id", authenticationService.getUserIdByEmail(credential.getEmail()));
        logger.info("user {} logged in", credential.getEmail());
    }

    @PostMapping("/logout")
    @ResponseBody
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (HttpUtil.sessionInvalid(request)) {
            response.getWriter().print("no user logged in yet");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        HttpSession session = request.getSession();
        Integer uid = (Integer) session.getAttribute("user_id");
        session.invalidate();   // logout
        logger.info("user {} logged out", uid);
    }
}





