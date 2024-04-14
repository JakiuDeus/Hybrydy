package me.jorlowski.serwisbackend.service;

import me.jorlowski.serwisbackend.model.FailureEntity;
import me.jorlowski.serwisbackend.model.NewFailure;
import me.jorlowski.serwisbackend.repository.FailureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FailureService {
    private final FailureRepository repository;

    public FailureService(FailureRepository repository) {
        this.repository = repository;
    }

    public List<FailureEntity> getFailures() {
        return repository.findAll();
    }

    public FailureEntity create(NewFailure newFailure) {
        FailureEntity failureEntity = new FailureEntity();
        failureEntity.setServicerName(newFailure.servicerName());
        failureEntity.setFailureType(newFailure.failureType());
        failureEntity.setName(newFailure.name());
        failureEntity.setDate(newFailure.date());
        failureEntity.setPotentialPrice(newFailure.potentialPrice());
        failureEntity.setPotentialDate(newFailure.potentialDate());
        failureEntity.setStatus(newFailure.status());
        failureEntity.setRepairDescription(newFailure.repairDescription());
        return repository.saveAndFlush(failureEntity);
    }

    public FailureEntity getById(Long id) {
        return repository.getReferenceById(id);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public FailureEntity edit(FailureEntity failureEntity) {
        return repository.saveAndFlush(failureEntity);
    }
}
