package org.letpam.pamslist.data;

import org.letpam.pamslist.models.MarketerInterest;

import java.util.Optional;

public interface MarketerInterestRepository {
    Optional<MarketerInterest> findByMarketerIdAndPatientId(int marketerId, int patientId);
    MarketerInterest create(MarketerInterest marketerInterest);
    boolean update(MarketerInterest marketerInterest);
    boolean delete(int marketerId, int patientId);
}

