package sckj.soams.ctrl;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

    @RequestMapping("/")
    public String index() {
        return "views/login";
    }
    
    @RequestMapping("/logout")
    public String logout(){
    	return "views/login";
    }
}
