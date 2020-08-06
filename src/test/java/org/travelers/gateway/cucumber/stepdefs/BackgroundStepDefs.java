package org.travelers.gateway.cucumber.stepdefs;

import io.cucumber.datatable.DataTable;
import io.cucumber.datatable.DataTableType;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import org.apache.commons.lang.RandomStringUtils;
import org.travelers.gateway.domain.User;
import org.travelers.gateway.repository.UserRepository;

import java.util.List;

public class BackgroundStepDefs extends StepDefs {

    private List<User> users;

    private final UserRepository userRepository;

    public BackgroundStepDefs(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Given("user with the following attributes")
    public void user_with_following_attributes(DataTable dataTable) {
        DataTableType.entry(User.class);
        this.users = dataTable.asList(User.class);

        users.forEach(user -> user.setPassword(RandomStringUtils.randomAlphanumeric(60)));
    }

    @When("user already exists")
    public void user_already_exist() {
        userRepository.deleteAll();
        userRepository.saveAll(users);
    }

}
