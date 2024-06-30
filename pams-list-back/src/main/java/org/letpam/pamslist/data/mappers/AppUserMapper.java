package org.letpam.pamslist.data.mappers;

import org.letpam.pamslist.models.AppUser;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class AppUserMapper implements RowMapper<AppUser> {

    private final List<String> authorities;

    public AppUserMapper(List<String> authorities) {
        this.authorities = authorities;
    }

    @Override
    public AppUser mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new AppUser(
                rs.getInt("id"),
                rs.getString("email"),
                rs.getString("password_hash"),
                rs.getString("first_name"),
                rs.getString("last_name"),
                rs.getObject("organization_id") != null ? rs.getInt("organization_id") : null,
                rs.getString("phone_number"),
                Optional.ofNullable(rs.getString("fax_number")),
                rs.getObject("last_login") != null ? new Date(rs.getTimestamp("last_login").getTime()) : null,
                rs.getBoolean("enabled"),
                authorities
        );
    }
}

