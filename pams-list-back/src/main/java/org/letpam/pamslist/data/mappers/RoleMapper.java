package org.letpam.pamslist.data.mappers;

import org.letpam.pamslist.models.Role;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RoleMapper implements RowMapper<Role> {
    @Override
    public Role mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Role(
                rs.getInt("id"),
                rs.getString("name")
        );
    }
}
