package me.jorlowski.serwisbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class FailureEntity {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    private String servicerName;
    @NotNull
    @Enumerated(EnumType.STRING)
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
    @Enumerated(EnumType.STRING)
    private Status status;
    private String repairDescription;
}
