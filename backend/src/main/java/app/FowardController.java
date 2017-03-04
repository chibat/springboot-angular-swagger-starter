package app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FowardController {
    @GetMapping("/i18n")
    public String index() {
        return "forward:/";
    }
}
