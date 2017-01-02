package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static springfox.documentation.builders.PathSelectors.regex;

@SpringBootApplication
@EnableSwagger2
@RestController
public class Application {

    @GetMapping("/rest/add")
    public Response add(@RequestParam Integer arg1, @RequestParam Integer arg2) {
        return new Response(arg1 + arg2);
    }

    @Bean
    public Docket documentation() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.any())
            .paths(regex("^/rest/.*$"))
            .build();
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
