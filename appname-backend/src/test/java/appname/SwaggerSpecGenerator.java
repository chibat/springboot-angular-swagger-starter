package appname;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import appname.AppnameApplication;
import springfox.documentation.staticdocs.SwaggerResultHandler;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=AppnameApplication.class)
public class SwaggerSpecGenerator {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context).build();
    }

    @Test
    public void convertSwaggerToAsciiDoc() throws Exception {
        this.mockMvc
            .perform(get("/v2/api-docs").accept(MediaType.APPLICATION_JSON))
            .andDo(SwaggerResultHandler.outputDirectory("publications").build())
            .andExpect(status().isOk());
    }
}
