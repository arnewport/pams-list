package org.letpam.pamslist.data;

import org.letpam.pamslist.data.mappers.RoleMapper;
import org.letpam.pamslist.models.Role;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleJdbcTemplateRepository implements RoleRepository {

    private final JdbcTemplate jdbcTemplate;

    public RoleJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Role findByName(String name) {
        final String sql = "select id, name from role where name = ?";
        return jdbcTemplate.queryForObject(sql, new RoleMapper(), name);
    }

    @Override
    public List<Role> findAll() {
        final String sql = "select id, name from role";
        return jdbcTemplate.query(sql, new RoleMapper());
    }

}

