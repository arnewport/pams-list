package org.letpam.pamslist.data.mappers;

import org.letpam.pamslist.models.MarketerInterest;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MarketerInterestMapper implements RowMapper<MarketerInterest> {
    @Override
    public MarketerInterest mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new MarketerInterest(
                rs.getInt("id"),
                rs.getInt("marketer_id"),
                rs.getInt("patient_id"),
                rs.getDate("date_interested"),
                rs.getDate("date_accepted"),
                rs.getDate("date_rejected"),
                rs.getString("rejection_reason"),
                rs.getString("status")
        );
    }
}

