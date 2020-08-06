package org.travelers.gateway.cucumber.stepdefs;

import io.cucumber.datatable.DataTable;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.travelers.gateway.web.rest.AccountResource;
import org.travelers.gateway.web.rest.TestUtil;
import org.travelers.gateway.web.rest.vm.ManagedUserVM;

import static org.aspectj.bridge.MessageUtil.fail;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CreateUserStepDef extends StepDefs {

    private MockMvc restAccountMockMvc;
    private ManagedUserVM user;

    private final AccountResource accountResource;

    public CreateUserStepDef(AccountResource accountResource) {
        this.accountResource = accountResource;
    }

    @Before
    public void setup() {
        this.restAccountMockMvc = MockMvcBuilders.standaloneSetup(accountResource).build();
    }

    @Given("user wants to create an account with the following attributes")
    public void user_create_account_with_attributes(DataTable dataTable) {
        user = (ManagedUserVM) dataTable.asList(ManagedUserVM.class).get(0);
        user.setPassword("test");
    }

    @When("^user save the new account .*?")
    public void user_save_new_account() throws Exception {
        this.actions = restAccountMockMvc.perform(
            post("/api/register")
                .contentType(TestUtil.APPLICATION_JSON)
                .content(TestUtil.convertObjectToJsonBytes(user)));
    }

    @Then("the save is {string}")
    public void save_is(String expectedResult) throws Exception {
        switch (expectedResult) {
            case "SUCCESSFUL":
                assertThat(actions.andReturn().getResponse().getStatus()).isIn(200, 201);
                break;
            case "FAIL":
                actions.andExpect(status().is4xxClientError());
                break;
            default:
                fail("Unexpected error");
        }
    }

}
