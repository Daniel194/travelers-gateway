package org.travelers.gateway.cucumber.stepdefs;

import io.cucumber.core.api.TypeRegistry;
import io.cucumber.core.api.TypeRegistryConfigurer;
import io.cucumber.datatable.DataTableType;
import io.cucumber.datatable.TableEntryTransformer;
import org.travelers.gateway.domain.User;
import org.travelers.gateway.service.dto.UserDTO;
import org.travelers.gateway.web.rest.vm.ManagedUserVM;

import java.util.Locale;

public class Configurer implements TypeRegistryConfigurer {

    @Override
    public Locale locale() {
        return Locale.ENGLISH;
    }

    @Override
    public void configureTypeRegistry(TypeRegistry registry) {
        registry.defineDataTableType(new DataTableType(User.class, (TableEntryTransformer<User>) entry -> {
            User user = new User();
            user.setId(entry.get("id"));
            user.setLogin(entry.get("login"));
            user.setEmail(entry.get("email"));

            return user;
        }));

        registry.defineDataTableType(new DataTableType(UserDTO.class, (TableEntryTransformer<UserDTO>) entry -> {
            UserDTO user = new UserDTO();
            user.setId(entry.get("id"));
            user.setLogin(entry.get("login"));
            user.setEmail(entry.get("email"));

            return user;
        }));

        registry.defineDataTableType(new DataTableType(ManagedUserVM.class, (TableEntryTransformer<ManagedUserVM>) entry -> {
            ManagedUserVM user = new ManagedUserVM();
            user.setId(entry.get("id"));
            user.setLogin(entry.get("login"));
            user.setEmail(entry.get("email"));

            return user;
        }));
    }
}
