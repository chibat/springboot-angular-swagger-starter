package app;

import static springfox.documentation.builders.PathSelectors.regex;

import java.awt.Desktop;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.Value;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@RestController
public class Application {

    @GetMapping("/rest/api/add")
    public Response add(@RequestParam Integer arg1, @RequestParam Integer arg2) {
        return new Response(arg1 + arg2);
    }

    @Bean
    public Docket documentation() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.any())
            .paths(regex("^/rest/api/.*$"))
            .build();
    }

    @Value
    public static class Response {
        private final Integer result;
    }

    private static void openBrowser() {
        if (System.getenv("SPRING_PROFILES_ACTIVE") != null || System.getProperty("spring.profiles.active") != null) {
            return;
        }
        System.setProperty("java.awt.headless", "false");
        try {
            Desktop.getDesktop().browse(new URI("http://localhost:8080"));
        } catch (IOException | URISyntaxException ignore) {
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        openBrowser();
    }
}
