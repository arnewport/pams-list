package org.letpam.pamslist.data;

import org.letpam.pamslist.data.mappers.AppUserMapper;
import org.letpam.pamslist.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository {

    private final JdbcTemplate jdbcTemplate;

    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public AppUser findByUsername(String username) {
        String sql = """
                select
                     u.id,
                     u.email as username,
                     u.password_hash,
                     u.enabled,
                     u.first_name,
                     u.last_name,
                     u.organization_id,
                     u.phone_number,
                     u.fax_number,
                     u.last_login
                from app_user u
                where u.email = ?;
                """;
        List<String> authorities = getAuthorities(username);
        return jdbcTemplate.query(sql, new AppUserMapper(authorities), username).stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public AppUser add(AppUser appUser) {
        SimpleJdbcInsert insert = new SimpleJdbcInsert(jdbcTemplate)
                .withTableName("app_user")
                .usingColumns("email", "password_hash", "enabled", "first_name", "last_name", "organization_id", "phone_number", "fax_number", "last_login")
                .usingGeneratedKeyColumns("id");

        HashMap<String, Object> args = new HashMap<>();
        args.put("email", appUser.getEmail());
        args.put("password_hash", appUser.getPassword());
        args.put("enabled", appUser.isEnabled());
        args.put("first_name", appUser.getFirstName());
        args.put("last_name", appUser.getLastName());
        args.put("organization_id", appUser.getOrganizationId());
        args.put("phone_number", appUser.getPhoneNumber());
        args.put("fax_number", appUser.getFaxNumber().orElse(null)); // Handle nullable field
        args.put("last_login", appUser.getLastLogin());

        int id = insert.executeAndReturnKey(args).intValue();
        appUser.setId(id);

        updateRoles(appUser);

        return appUser;
    }

    @Override
    public void addRoleToUser(int appUserId, int roleId) {
        String sql = """
                insert into user_role (app_user_id, role_id)
                values (?, ?);
                """;
        jdbcTemplate.update(sql, appUserId, roleId);
    }

    @Override
    @Transactional
    public void save(AppUser appUser) {
        if (appUser.getId() == 0) {
            add(appUser);
        } else {
            String sql = """
                    update app_user set
                        email = ?,
                        password_hash = ?,
                        enabled = ?,
                        first_name = ?,
                        last_name = ?,
                        organization_id = ?,
                        phone_number = ?,
                        fax_number = ?,
                        last_login = ?
                    where id = ?;
                    """;
            jdbcTemplate.update(sql,
                    appUser.getEmail(),
                    appUser.getPassword(),
                    appUser.isEnabled(),
                    appUser.getFirstName(),
                    appUser.getLastName(),
                    appUser.getOrganizationId(),
                    appUser.getPhoneNumber(),
                    appUser.getFaxNumber().orElse(null),
                    appUser.getLastLogin(),
                    appUser.getId());

            updateRoles(appUser);
        }
    }

    private void updateRoles(AppUser appUser) {
        jdbcTemplate.update("delete from user_role where app_user_id = ?;", appUser.getId());
        for (var authority : appUser.getAuthorities()) {
            String sql = """
                    insert into user_role (app_user_id, role_id)
                    values (?, (select id from role where `name` = ?));
                    """;
            jdbcTemplate.update(sql, appUser.getId(), authority.getAuthority());
        }
    }

    private List<String> getAuthorities(String username) {
        final String sql = """
                select
                    r.name
                from role r
                inner join user_role ur on ur.role_id = r.id
                inner join app_user u on u.id = ur.app_user_id
                where u.email = ?;
                """;
        return jdbcTemplate.query(sql, (rs, i) -> rs.getString("name"), username);
    }
}
