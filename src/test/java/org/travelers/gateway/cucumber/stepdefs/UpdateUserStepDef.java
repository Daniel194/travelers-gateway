package org.travelers.gateway.cucumber.stepdefs;

import io.cucumber.datatable.DataTable;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.travelers.gateway.service.dto.UserDTO;
import org.travelers.gateway.web.rest.AccountResource;

import static org.aspectj.bridge.MessageUtil.fail;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.travelers.gateway.web.rest.TestUtil.convertObjectToJsonBytes;

public class UpdateUserStepDef extends StepDefs {

    private MockMvc restAccountMockMvc;
    private UserDTO user;

    private final AccountResource accountResource;

    public UpdateUserStepDef(AccountResource accountResource) {
        this.accountResource = accountResource;
    }

    @Before
    public void setup() {
        this.restAccountMockMvc = MockMvcBuilders.standaloneSetup(accountResource).build();
    }

    @Given("user wants to update an account with the following attributes")
    public void user_update_account_with_attributes(DataTable dataTable) {
        user = (UserDTO) dataTable.asList(UserDTO.class).get(0);

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(user.getLogin(), user.getLogin()));
        SecurityContextHolder.setContext(securityContext);
    }

    @When("^user update the new account .*?")
    public void user_update_new_account() throws Exception {
        actions = restAccountMockMvc.perform(post("/api/account")
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .content(convertObjectToJsonBytes(user)));
    }

    @Then("the update is {string}")
    public void update_is(String expectedResult) {
        int statusCode = actions.andReturn().getResponse().getStatus();

        switch (expectedResult) {
            case "SUCCESSFUL":
                assertThat(statusCode).isIn(200, 201);
                break;
            case "FAIL":
                assertThat(statusCode).isBetween(400, 504);
                break;
            default:
                fail("Unexpected error");
        }
    }

}
