package me.jorlowski.serwisbackend.model;

import jakarta.validation.constraints.NotEmpty;

import java.util.Date;

public record NewFailure(


        String servicerName,
        FailureType failureType,
        String name,
        Date date,
        Float potentialPrice,
        Date potentialDate,
        Status status,
        String repairDescription
) {
}
