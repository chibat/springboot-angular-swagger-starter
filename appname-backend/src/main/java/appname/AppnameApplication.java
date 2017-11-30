package appname;

import java.awt.Desktop;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppnameApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppnameApplication.class, args);
        openBrowser();
    }

    private static void openBrowser() {

        if (System.getenv("SPRING_PROFILES_ACTIVE") != null || System.getProperty("spring.profiles.active") != null) {
            return;
        }

        if (AppnameApplication.class.getResource("/static/index.html") == null) {
            return;
        }

        System.setProperty("java.awt.headless", "false");
        try {
            Desktop.getDesktop().browse(new URI("http://localhost:8080"));
        } catch (IOException | URISyntaxException ignore) {
        }
    }
}
