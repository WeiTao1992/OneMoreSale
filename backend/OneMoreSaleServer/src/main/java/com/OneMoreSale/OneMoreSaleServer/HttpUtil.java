package com.OneMoreSale.OneMoreSaleServer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 *
 *
 *
 * */
@Controller
public class HttpUtil {

    public static boolean sessionInvalid(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session == null;
    }

    @ResponseBody
    @GetMapping("/sessiondemo")
    public String sessionDemo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (HttpUtil.sessionInvalid(request)) { // session invalid
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return "session invalid";
        }
        //  session valid
        // you can get userid
        String userId = (String)request.getSession().getAttribute("user_id");
        return "Hello from user " + userId;
    }
}
