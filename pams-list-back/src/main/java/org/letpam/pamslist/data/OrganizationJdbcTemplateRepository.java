package org.letpam.pamslist.data;

import org.letpam.pamslist.data.mappers.OrganizationMapper;
import org.letpam.pamslist.models.Organization;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public class OrganizationJdbcTemplateRepository implements OrganizationRepository {

    private final JdbcTemplate jdbcTemplate;

    public OrganizationJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Organization findById(int id) {
        final String sql = "SELECT id, name, description FROM organization WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new OrganizationMapper(), id);
    }

    @Override
    public List<Organization> findAll() {
        final String sql = "SELECT id, name, description FROM organization";
        return jdbcTemplate.query(sql, new OrganizationMapper());
    }

    @Override
    public Organization add(Organization organization) {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("organization")
                .usingGeneratedKeyColumns("id");

        HashMap<String, Object> args = new HashMap<>();
        args.put("name", organization.getName());
        args.put("description", organization.getDescription());

        int id = insert.executeAndReturnKey(args).intValue();
        organization.setId(id);
        return organization;
    }

    @Override
    public boolean update(Organization organization) {
        final String sql = "UPDATE organization SET name = ?, description = ? WHERE id = ?";
        return jdbcTemplate.update(sql,
                organization.getName(),
                organization.getDescription(),
                organization.getId()) > 0;
    }

    @Override
    public boolean deleteById(int id) {
        final String sql = "DELETE FROM organization WHERE id = ?";
        return jdbcTemplate.update(sql, id) > 0;
    }
}
