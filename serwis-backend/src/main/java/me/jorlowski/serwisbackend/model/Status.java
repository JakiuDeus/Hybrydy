package me.jorlowski.serwisbackend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Status {
    NEW("NEW"),
    IN_PROGRESS("IN_PROGRESS"),
    FINISHED("FINISHED"),
    UNREPAIRABLE("UNREPAIRABLE");

    @JsonValue
    private final String status;

    Status(String status) {
        this.status = status;
    }
    @JsonCreator
    public static Status fromString(String string){
        switch (string){
            case "NEW" -> {
                return NEW;
            }
            case "IN_PROGRESS" -> {
                return IN_PROGRESS;
            }
            case "FINISHED" -> {
                return FINISHED;
            }
            case "CRITCAL" -> {
                return UNREPAIRABLE;
            }

        }
        return null;
    }
}
