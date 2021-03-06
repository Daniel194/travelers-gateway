package org.travelers.gateway.web.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClientForwardController {

    @GetMapping(value = {"/{path:[^\\.]*}", "/{path:^(?!websocket).*}/**/{path:[^\\.]*}"})
    public String forward() {
        return "forward:/";
    }
}
