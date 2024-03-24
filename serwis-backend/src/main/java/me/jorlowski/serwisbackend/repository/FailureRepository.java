package me.jorlowski.serwisbackend.repository;

import me.jorlowski.serwisbackend.model.Failure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FailureRepository extends JpaRepository<Failure, Long> {

}
