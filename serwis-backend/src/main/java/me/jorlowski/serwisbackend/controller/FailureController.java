package me.jorlowski.serwisbackend.controller;

import me.jorlowski.serwisbackend.model.NewFailure;
import me.jorlowski.serwisbackend.service.FailureService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class FailureController {
    private final FailureService failureService;

    public FailureController(FailureService failureService) {
        this.failureService = failureService;
    }

    @GetMapping
    public String index(Model model) {
        model.addAttribute("failures", failureService.getFailures());
        return "index";
    }

    @PostMapping("/new-failure")
    public String newFailure(@ModelAttribute NewFailure newFailure) {
        failureService.create(newFailure, "TEST");
        return "redirect:/";
    }
}
