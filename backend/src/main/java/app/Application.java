package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@RestController
public class Application {

    @GetMapping("/rest/add")
    public Response add(@RequestParam Integer arg1, @RequestParam Integer arg2) {
        return new Response(arg1 + arg2);
    }

    public static class Response {
        public final Integer result;

        public Response(final Integer result) {
            this.result = result;
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
