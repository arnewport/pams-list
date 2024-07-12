package org.letpam.pamslist.data;

import org.letpam.pamslist.models.MarketerInterest;

public interface MarketerInterestRepository {
    MarketerInterest findByMarketerIdAndPatientId(int marketerId, int patientId);
    MarketerInterest create(MarketerInterest marketerInterest);
    boolean update(MarketerInterest marketerInterest);
    boolean delete(int marketerId, int patientId);
}

