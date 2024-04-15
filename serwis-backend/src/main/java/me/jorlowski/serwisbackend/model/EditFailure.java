package me.jorlowski.serwisbackend.model;

import java.util.Date;

public record EditFailure(
        String servicerName,
        Float potentialPrice,
        Date potentialDate,
        String status,
        String repairDescription
) {
}
