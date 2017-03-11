package app.web;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lombok.Value;

/**
 * TODO swagger spec 出す画面
 * 
 * @author tomofumi
 */
@RestController
@RequestMapping("/rest/api/todo")
public class TodoController {

    private static final String TAG = "todo";

    private int sequence = 0;
    private final Map<Integer, Todo> map = new LinkedHashMap<>();

    @GetMapping
    @ApiOperation(value = "read", tags = TAG, nickname = "read")
    public List<Todo> read() {
        return new ArrayList<>(map.values());
    }

    @PostMapping
    @ApiOperation(value = "create", tags = TAG, nickname = "create")
    public Todo create(@RequestParam final String text) {
        Todo model = new Todo(++sequence, 0, text);
        map.put(model.getId(), model);
        return model;
    }

    @PutMapping
    @ApiOperation(value = "update", tags = TAG, nickname = "update")
    public Todo update(@RequestBody final Todo todoModel) {
        map.put(todoModel.getId(), todoModel);
        return todoModel;
    }

    @DeleteMapping
    @ApiOperation(value = "delete", tags = TAG, nickname = "delete")
    public List<Todo> delete() {
        map.forEach((id, model) -> {
            if (model.getStatus() == 1) {
                map.remove(id);
            }
        });
        return new ArrayList<>(map.values());
    }

    @Value
    public static class Todo {
        private final int id;
        private final int status;
        private final String text;
    }
}
