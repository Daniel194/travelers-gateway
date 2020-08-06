package org.travelers.gateway.cucumber.stepdefs;

import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import org.travelers.gateway.web.rest.AccountResource;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class RetrieveUserStepDefs extends StepDefs {

    private final AccountResource accountResource;

    public RetrieveUserStepDefs(AccountResource accountResource) {
        this.accountResource = accountResource;
    }

    @When("I want to see my {string} account")
    public void i_want_see(String login) throws Throwable {
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(login, login));
        SecurityContextHolder.setContext(securityContext);

        MockMvc restAccountMockMvc = MockMvcBuilders.standaloneSetup(accountResource).build();

        actions = restAccountMockMvc.perform(get("/api/account")
            .accept(MediaType.APPLICATION_JSON));
    }

    @Then("the account is found")
    public void the_user_is_found() throws Throwable {
        actions
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE));
    }

    @Then("his email is {string}")
    public void his_last_name_is(String lastName) throws Throwable {
        actions.andExpect(jsonPath("$.email").value(lastName));
    }

}
