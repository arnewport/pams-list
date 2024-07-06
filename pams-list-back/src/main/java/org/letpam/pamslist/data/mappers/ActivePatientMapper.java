package org.letpam.pamslist.data.mappers;

import org.letpam.pamslist.models.Patient;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ActivePatientMapper implements RowMapper<Patient> {

    @Override
    public Patient mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Patient(
                rs.getInt("id"),
                rs.getString("first_name"),
                rs.getString("last_name"),
                rs.getInt("age"),
                rs.getString("sex"),
                rs.getBoolean("ready_for_discharge"),
                rs.getBoolean("medicare"),
                rs.getBoolean("medi_cal"),
                rs.getString("medicare_plan"),
                rs.getString("medi_cal_plan"),
                rs.getBoolean("hmo"),
                rs.getBoolean("ppo"),
                rs.getBoolean("va"),
                rs.getBoolean("loa_available"),
                rs.getBoolean("alw"),
                rs.getBoolean("subacute"),
                rs.getBoolean("iso"),
                rs.getBoolean("requires_locked"),
                rs.getString("patient_notes"),
                rs.getDate("date_of_hospital_admission"),
                rs.getDate("date_added_to_pam_list"),
                rs.getDate("date_placed_or_withdrawn"),
                rs.getInt("total_interested"),
                rs.getInt("total_rejected"),
                rs.getInt("manager_id"),
                rs.getInt("manager_organization_id"),
                rs.getInt("marketer_id"),
                rs.getInt("marketer_organization_id"),
                rs.getString("patient_status"),
                rs.getString("tracking_status"),
                rs.getString("expected_snf_discharge_type"),
                rs.getBoolean("archived")
        );
    }
}

