package me.jorlowski.serwisbackend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum FailureType {
    LOW("LOW"),
    MILD("MILD"),
    HIGH("HIGH"),
    CRITICAL("CRITICAL");

    @JsonValue
    private final String failureName;

    FailureType(String failureName) {
        this.failureName = failureName;
    }
    @JsonCreator
    public static FailureType fromString(String string){
        switch (string){
            case "LOW" -> {
                return LOW;
            }
            case "MILD" -> {
                return MILD;
            }
            case "HIGH" -> {
                return HIGH;
            }
            case "CRITiCAL" -> {
                return CRITICAL;
            }

        }
        return null;
    }
}
