package org.letpam.pamslist.data.mappers;

import org.letpam.pamslist.models.Organization;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class OrganizationMapper implements RowMapper<Organization> {
    @Override
    public Organization mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Organization(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("description")
        );
    }
}
