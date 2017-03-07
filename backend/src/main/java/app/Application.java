package app;

import static springfox.documentation.builders.PathSelectors.regex;

import java.awt.Desktop;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class Application {

    @Bean
    public Docket documentation() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.any())
            .paths(regex("^/rest/api/.*$"))
            .build();
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        openBrowser();
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
}
