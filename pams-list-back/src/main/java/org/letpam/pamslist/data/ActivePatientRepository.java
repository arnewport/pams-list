package org.letpam.pamslist.data;

import org.letpam.pamslist.models.Patient;

import java.util.List;

public interface ActivePatientRepository {
    List<Patient> findAll();
    Patient findById(int id);
    Patient add(Patient patient);
    boolean update(Patient patient);
    boolean archive(int id);
}
