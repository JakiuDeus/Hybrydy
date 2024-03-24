package me.jorlowski.serwisbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
public class Failure {
    @Id
    @GeneratedValue
    private Long id;
    private FailureType failureType;
    private String name;
    private Date date;
    private Float potentialPrice;
    private Date potentialDate;
    private Status status;
    private String repairDescription;
}
