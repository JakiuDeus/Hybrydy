package me.jorlowski.serwisbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class FailureEntity {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String servicerName;
    @NotNull
    private FailureType failureType;
    @NotNull
    private String name;
    @NotNull
    private Date date;
    @NotNull
    private Float potentialPrice;
    @NotNull
    private Date potentialDate;
    @NotNull
    private Status status;
    private String repairDescription;
}
