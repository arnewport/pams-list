package org.letpam.pamslist.domain;

import org.letpam.pamslist.data.ActivePatientRepository;
import org.letpam.pamslist.models.Patient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ActivePatientService {

    private final ActivePatientRepository activePatientRepository;

    public ActivePatientService(ActivePatientRepository activePatientRepository) {
        this.activePatientRepository = activePatientRepository;
    }

    public List<Patient> findAll() {
        return activePatientRepository.findAll();
    }

    public Patient findById(int id) {
        return activePatientRepository.findById(id);
    }

    public Patient add(Patient patient) {
        patient.setArchived(false);
        activePatientRepository.add(patient);
        return patient;
    }

    @Transactional
    public Patient update(int id, Patient updatedPatient) {
        Patient existingPatient = findById(id);
        if (existingPatient == null || existingPatient.isArchived()) {
            throw new IllegalArgumentException("Patient not found or is archived.");
        }

        updatedPatient.setId(id);
        activePatientRepository.update(updatedPatient);
        return updatedPatient;
    }

    public void archive(int id) {
        activePatientRepository.archive(id);
    }
}
