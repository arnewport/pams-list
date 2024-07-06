package org.letpam.pamslist.data;

import org.letpam.pamslist.data.mappers.ActivePatientMapper;
import org.letpam.pamslist.models.Patient;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ActivePatientJdbcTemplateRepository implements ActivePatientRepository {

    private final JdbcTemplate jdbcTemplate;

    public ActivePatientJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Patient> findAll() {
        final String sql = "SELECT * FROM patient WHERE archived = 0";
        return jdbcTemplate.query(sql, new ActivePatientMapper());
    }

    @Override
    public Patient findById(int id) {
        final String sql = "SELECT * FROM patient WHERE id = ? AND archived = 0";
        return jdbcTemplate.queryForObject(sql, new ActivePatientMapper(), id);
    }

    @Override
    public Patient add(Patient patient) {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("patient")
                .usingGeneratedKeyColumns("id");

        Map<String, Object> args = new HashMap<>();
        args.put("first_name", patient.getFirstName());
        args.put("last_name", patient.getLastName());
        args.put("age", patient.getAge());
        args.put("sex", patient.getSex());
        args.put("ready_for_discharge", patient.isReadyForDischarge());
        args.put("medicare", patient.isMedicare());
        args.put("medi_cal", patient.isMediCal());
        args.put("medicare_plan", patient.getMedicarePlan());
        args.put("medi_cal_plan", patient.getMediCalPlan());
        args.put("hmo", patient.isHmo());
        args.put("ppo", patient.isPpo());
        args.put("va", patient.isVa());
        args.put("loa_available", patient.isLoaAvailable());
        args.put("alw", patient.isAlw());
        args.put("subacute", patient.isSubacute());
        args.put("iso", patient.isIso());
        args.put("requires_locked", patient.isRequiresLocked());
        args.put("patient_notes", patient.getPatientNotes());
        args.put("date_of_hospital_admission", patient.getDateOfHospitalAdmission());
        args.put("date_added_to_pam_list", patient.getDateAddedToPamList());
        args.put("date_placed_or_withdrawn", patient.getDatePlacedOrWithdrawn());
        args.put("total_interested", patient.getTotalInterested());
        args.put("total_rejected", patient.getTotalRejected());
        args.put("manager_id", patient.getManagerId());
        args.put("manager_organization_id", patient.getManagerOrganizationId());
        args.put("marketer_id", patient.getMarketerId());
        args.put("marketer_organization_id", patient.getMarketerOrganizationId());
        args.put("patient_status", patient.getPatientStatus());
        args.put("tracking_status", patient.getTrackingStatus());
        args.put("expected_snf_discharge_type", patient.getExpectedSnfDischargeType());
        args.put("archived", patient.isArchived());

        int id = insert.executeAndReturnKey(args).intValue();
        patient.setId(id);
        return patient;
    }

    @Override
    public boolean update(Patient patient) {
        final String sql = "UPDATE patient SET first_name = ?, last_name = ?, age = ?, sex = ?, ready_for_discharge = ?, medicare = ?, medi_cal = ?, medicare_plan = ?, medi_cal_plan = ?, hmo = ?, ppo = ?, va = ?, loa_available = ?, alw = ?, subacute = ?, iso = ?, requires_locked = ?, patient_notes = ?, date_of_hospital_admission = ?, date_added_to_pam_list = ?, date_placed_or_withdrawn = ?, total_interested = ?, total_rejected = ?, manager_id = ?, manager_organization_id = ?, marketer_id = ?, marketer_organization_id = ?, patient_status = ?, tracking_status = ?, expected_snf_discharge_type = ? WHERE id = ? AND archived = 0";
        return jdbcTemplate.update(sql,
                patient.getFirstName(),
                patient.getLastName(),
                patient.getAge(),
                patient.getSex(),
                patient.isReadyForDischarge(),
                patient.isMedicare(),
                patient.isMediCal(),
                patient.getMedicarePlan(),
                patient.getMediCalPlan(),
                patient.isHmo(),
                patient.isPpo(),
                patient.isVa(),
                patient.isLoaAvailable(),
                patient.isAlw(),
                patient.isSubacute(),
                patient.isIso(),
                patient.isRequiresLocked(),
                patient.getPatientNotes(),
                patient.getDateOfHospitalAdmission(),
                patient.getDateAddedToPamList(),
                patient.getDatePlacedOrWithdrawn(),
                patient.getTotalInterested(),
                patient.getTotalRejected(),
                patient.getManagerId(),
                patient.getManagerOrganizationId(),
                patient.getMarketerId(),
                patient.getMarketerOrganizationId(),
                patient.getPatientStatus(),
                patient.getTrackingStatus(),
                patient.getExpectedSnfDischargeType(),
                patient.getId()) > 0;
    }

    @Override
    public boolean archive(int id) {
        final String sql = "UPDATE patient SET archived = 1 WHERE id = ? AND archived = 0";
        return jdbcTemplate.update(sql, id) > 0;
    }
}


