package me.jorlowski.serwisbackend.model;

import java.util.Date;

public record NewFailure(
        FailureType failureType,
        String name,
        Date date,
        Float potentialPrice,
        Date potentialDate,
        Status status,
        String repairDescription
) {
}
