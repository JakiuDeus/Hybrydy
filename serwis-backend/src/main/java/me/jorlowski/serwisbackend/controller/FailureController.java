package me.jorlowski.serwisbackend.controller;

import me.jorlowski.serwisbackend.model.EditFailure;
import me.jorlowski.serwisbackend.model.FailureEntity;
import me.jorlowski.serwisbackend.model.NewFailure;
import me.jorlowski.serwisbackend.service.FailureService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/failures")
@CrossOrigin
public class FailureController {
    private final FailureService failureService;

    public FailureController(FailureService failureService) {
        this.failureService = failureService;
    }

    @GetMapping
    public List<FailureEntity> index() {
       return failureService.getFailures();
    }

    @GetMapping("/{id}")
    public FailureEntity getFailureById(@PathVariable Long id) {
        return failureService.getById(id);
    }

    @PostMapping("/new-failure")
    public FailureEntity newFailure(@Validated @RequestBody NewFailure newFailure) {
        System.out.println(newFailure);
        return failureService.create(newFailure, "TEST");
    }

    @PostMapping("/edit/{id}")
    public FailureEntity editFailure(@Validated @RequestBody EditFailure editFailure, @PathVariable Long id) {
        FailureEntity failureEntity = failureService.getById(id);
        //TODO pozamieniać
        return failureService.edit(failureEntity);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteFailureById(@PathVariable Long id) {
        failureService.deleteById(id);
    }


}
