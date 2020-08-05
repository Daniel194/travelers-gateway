package org.travelers.gateway.cucumber.stepdefs;

import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class UpdateUserStepDef extends StepDefs {

    @Given("user wants to update an account with the following attributes")
    public void user_update_account_with_attributes(DataTable dataTable) {

    }

    @When("user update the new account {string}")
    public void user_update_new_account(String testCase) {

    }

    @Then("the update is {string}")
    public void update_is(String expectedResult) {

    }

}
