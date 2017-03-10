package app.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lombok.Value;

@RestController
public class CalculatorController {

    @GetMapping("/rest/api/add")
    @ApiOperation(value = "add", tags = "calculator", nickname = "add")
    public Response add(@RequestParam Integer arg1, @RequestParam Integer arg2) {
        return new Response(arg1 + arg2);
    }

    @Value
    public static class Response {
        private final Integer result;
    }
}
