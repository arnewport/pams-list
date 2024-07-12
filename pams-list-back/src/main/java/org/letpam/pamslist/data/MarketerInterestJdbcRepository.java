package org.letpam.pamslist.data;

import org.letpam.pamslist.models.MarketerInterest;
import org.letpam.pamslist.data.mappers.MarketerInterestMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MarketerInterestJdbcRepository implements MarketerInterestRepository {

    private final JdbcTemplate jdbcTemplate;

    public MarketerInterestJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public MarketerInterest findByMarketerIdAndPatientId(int marketerId, int patientId) {
        final String sql = "SELECT * FROM marketer_interest WHERE marketer_id = ? AND patient_id = ?";
        return jdbcTemplate.queryForObject(sql, new MarketerInterestMapper(), marketerId, patientId);
    }


    @Override
    public MarketerInterest create(MarketerInterest marketerInterest) {
        final String sql = "INSERT INTO marketer_interest (marketer_id, patient_id, date_interested, date_accepted, date_rejected, rejection_reason, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                marketerInterest.getMarketerId(),
                marketerInterest.getPatientId(),
                marketerInterest.getDateInterested(),
                marketerInterest.getDateAccepted(),
                marketerInterest.getDateRejected(),
                marketerInterest.getRejectionReason(),
                marketerInterest.getStatus());

        int id = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        marketerInterest.setId(id);
        return marketerInterest;
    }

    @Override
    public boolean update(MarketerInterest marketerInterest) {
        final String sql = "UPDATE marketer_interest SET date_interested = ?, date_accepted = ?, date_rejected = ?, rejection_reason = ?, status = ? WHERE marketer_id = ? AND patient_id = ?";
        return jdbcTemplate.update(sql,
                marketerInterest.getDateInterested(),
                marketerInterest.getDateAccepted(),
                marketerInterest.getDateRejected(),
                marketerInterest.getRejectionReason(),
                marketerInterest.getStatus(),
                marketerInterest.getMarketerId(),
                marketerInterest.getPatientId()) > 0;
    }

    @Override
    public boolean delete(int marketerId, int patientId) {
        final String sql = "DELETE FROM marketer_interest WHERE marketer_id = ? AND patient_id = ?";
        return jdbcTemplate.update(sql, marketerId, patientId) > 0;
    }
}
