package org.travelers.gateway.cucumber.stepdefs;

import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class CreateUserStepDef extends StepDefs {

    @Given("user wants to create an account with the following attributes")
    public void user_create_account_with_attributes(DataTable dataTable) {

    }

    @When("user save the new account {string}")
    public void user_save_new_account(String testCase) {

    }

    @Then("the save is {string}")
    public void save_is(String expectedResult) {

    }

}
