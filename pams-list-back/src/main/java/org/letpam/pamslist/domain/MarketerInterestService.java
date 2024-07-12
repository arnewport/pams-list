package org.letpam.pamslist.domain;

import org.letpam.pamslist.models.MarketerInterest;
import org.letpam.pamslist.data.MarketerInterestRepository;
import org.springframework.stereotype.Service;

@Service
public class MarketerInterestService {
    private final MarketerInterestRepository repository;

    public MarketerInterestService(MarketerInterestRepository repository) {
        this.repository = repository;
    }

    public MarketerInterest findByMarketerIdAndPatientId(int marketerId, int patientId) {
        return repository.findByMarketerIdAndPatientId(marketerId, patientId);
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

