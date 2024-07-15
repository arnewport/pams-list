package org.letpam.pamslist.data;

import org.letpam.pamslist.models.MarketerInterest;

import java.util.List;
import java.util.Optional;

public interface MarketerInterestRepository {
    List<MarketerInterest> findAllWithPatientId(int patientId);
    Optional<MarketerInterest> findByMarketerIdAndPatientId(int marketerId, int patientId);
    MarketerInterest create(MarketerInterest marketerInterest);
    boolean update(MarketerInterest marketerInterest);
    boolean delete(int marketerId, int patientId);
}

