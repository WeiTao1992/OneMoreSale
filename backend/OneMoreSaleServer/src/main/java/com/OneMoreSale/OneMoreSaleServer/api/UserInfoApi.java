package com.OneMoreSale.OneMoreSaleServer.api;

import com.OneMoreSale.OneMoreSaleServer.HttpUtil;
import com.OneMoreSale.OneMoreSaleServer.model.Account;
import com.OneMoreSale.OneMoreSaleServer.model.ResponseWrapper;
import com.OneMoreSale.OneMoreSaleServer.model.User;
import com.OneMoreSale.OneMoreSaleServer.service.AuthenticationService;
import com.OneMoreSale.OneMoreSaleServer.service.UserInfoService;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/userinfo")
public class UserInfoApi {

    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private AuthenticationService authenticationService;

    private static Logger logger = LoggerFactory.getLogger(AuthenticationApi.class);


    @RequestMapping(value = "/getUserInfo", method = RequestMethod.GET)
    @ResponseBody
    public User getUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (HttpUtil.sessionInvalid(request)) { // session invalid
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            logger.warn("[getUserInfo] The user has not logged in yet");
            return null;
        }
        Integer userId = (Integer)request.getSession().getAttribute("user_id");
        if (!userInfoService.validateUserId(userId)) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }
        return userInfoService.getUserById(userId);
    }

    @RequestMapping(value = "/UpdatePassword", method = RequestMethod.POST)
    @ResponseBody
    public ResponseWrapper updatePassword(@RequestBody Map<String, String> postBody, HttpServletRequest request, HttpServletResponse response) throws IOException{
        //判断session是否invalid
        if (HttpUtil.sessionInvalid(request)) { // session invalid
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return new ResponseWrapper("Session Invalid");
        }
        //判断用户是否存在在数据库中
        String email = (String)request.getSession().getAttribute("email");
        int userId = authenticationService.getUserIdByEmail(email);
        if (userId == -1) {
            response.sendError(HttpServletResponse.SC_CONFLICT, "user doesn't exist");
            return new ResponseWrapper("User Doesn't Exist");
        }
        //获取post body里面信息
        String username = postBody.get("username");
        String password = postBody.get("password");
        logger.info("[userInfoUpdate] user {} Update Password", email);
        userInfoService.updatePassword(email, username, password);
        return new ResponseWrapper("Success");
    }

    @RequestMapping(value = "/UpdateAddress", method = RequestMethod.POST)
    @ResponseBody
    public ResponseWrapper updateAddress(@RequestBody Map<String, String> postBody, HttpServletRequest request, HttpServletResponse response)throws IOException{
        //判断session是否invalid
        if (HttpUtil.sessionInvalid(request)) { // session invalid
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return new ResponseWrapper("Session Invalid");
        }
        //判断用户是否存在在数据库中
        String email = (String)request.getSession().getAttribute("email");
        int userId = authenticationService.getUserIdByEmail(email);
        if (userId == -1) {
            response.sendError(HttpServletResponse.SC_CONFLICT, "User Doesn't Exist");
            return new ResponseWrapper("User Doesn't Exist");
        }
        //获取post body里面信息
        String phone = postBody.get("phone");
        String address = postBody.get("address");
        logger.info("[userInfoUpdate] user {} Update Address", email);
        userInfoService.updateAddress(email, phone, address);
        return new ResponseWrapper("Success");
    }
}
