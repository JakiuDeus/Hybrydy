package me.jorlowski.serwisbackend.controller;

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
public class FailureController {
    private final FailureService failureService;

    public FailureController(FailureService failureService) {
        this.failureService = failureService;
    }

    @GetMapping
    public ResponseEntity<List<FailureEntity>> index() {
       return ResponseEntity.ok(failureService.getFailures());
    }

    @PostMapping("/new-failure")
    public ResponseEntity<FailureEntity> newFailure(@Validated @RequestBody NewFailure newFailure) {
        URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/failures/{id}")
                .build(String.valueOf(failureService.create(newFailure, "TEST")));
        return ResponseEntity.created(uri).build();
    }
}
