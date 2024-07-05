package org.letpam.pamslist.data;

import org.letpam.pamslist.data.mappers.RoleMapper;
import org.letpam.pamslist.models.Role;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class RoleJdbcTemplateRepository implements RoleRepository {

    private final JdbcTemplate jdbcTemplate;

    public RoleJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Role findByName(String name) {
        final String sql = "SELECT id, name FROM role WHERE name = ?";
        return jdbcTemplate.queryForObject(sql, new RoleMapper(), name);
    }

    @Override
    public List<Role> findAll() {
        final String sql = "SELECT id, name FROM role";
        return jdbcTemplate.query(sql, new RoleMapper());
    }

    @Override
    public Optional<Role> findById(int id) {
        final String sql = "SELECT id, name FROM role WHERE id = ?";
        List<Role> roles = jdbcTemplate.query(sql, new RoleMapper(), id);
        return roles.stream().findFirst();
    }
}
