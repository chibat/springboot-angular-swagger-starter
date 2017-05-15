package app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class ForwardController {

    @GetMapping("/forwardRoot")
    @ResponseStatus(HttpStatus.OK)
    public String forwardRoot() {
        return "forward:/index.html";
    }
}
