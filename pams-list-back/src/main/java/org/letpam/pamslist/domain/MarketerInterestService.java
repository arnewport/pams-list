package org.letpam.pamslist.domain;

import org.letpam.pamslist.models.MarketerInterest;
import org.letpam.pamslist.data.MarketerInterestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarketerInterestService {
    private final MarketerInterestRepository repository;

    public List<MarketerInterest> findAllWithPatientId(int patientId) {
        return repository.findAllWithPatientId(patientId);
    }

    public MarketerInterestService(MarketerInterestRepository repository) {
        this.repository = repository;
    }

    public Optional<MarketerInterest> findByMarketerIdAndPatientId(int marketerId, int patientId) {
        return repository.findByMarketerIdAndPatientId(marketerId, patientId);
    }

    public List<MarketerInterest> findByMarketerId(int marketerId) {
        return repository.findByMarketerId(marketerId);
    }

    public MarketerInterest create(MarketerInterest marketerInterest) {
        return repository.create(marketerInterest);
    }

    public boolean update(MarketerInterest marketerInterest) {
        return repository.update(marketerInterest);
    }

    public boolean delete(int marketerId, int patientId) {
        return repository.delete(marketerId, patientId);
    }
}

