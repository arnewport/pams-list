package org.letpam.pamslist.data;

import org.letpam.pamslist.data.mappers.AppUserMapper;
import org.letpam.pamslist.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository {

    private static final Logger logger = Logger.getLogger(AppUserJdbcTemplateRepository.class.getName());

    private final JdbcTemplate jdbcTemplate;

    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public AppUser findById(int id) {
        final String sql = "SELECT id, email, first_name, last_name, organization_id, phone_number, fax_number, last_login, enabled " +
                "FROM app_user WHERE id = ?";

        return jdbcTemplate.queryForObject(sql, new Object[]{id}, appUserRowMapper());
    }

    private RowMapper<AppUser> appUserRowMapper() {
        return (rs, rowNum) -> {
            AppUser appUser = new AppUser();
            appUser.setId(rs.getInt("id"));
            appUser.setEmail(rs.getString("email"));
            appUser.setFirstName(rs.getString("first_name"));
            appUser.setLastName(rs.getString("last_name"));
            appUser.setOrganizationId(rs.getInt("organization_id"));
            appUser.setPhoneNumber(rs.getString("phone_number"));
            appUser.setFaxNumber(Optional.ofNullable(rs.getString("fax_number")));
            appUser.setLastLogin(rs.getTimestamp("last_login"));
            appUser.setEnabled(rs.getBoolean("enabled"));
            return appUser;
        };
    }

    @Override
    @Transactional
    public AppUser findByEmail(String email) {
        logger.info("Finding user by email: " + email);
        String sql = """
                select
                     u.id,
                     u.email,
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
        List<String> authorities = getAuthorities(email);
        try {
            AppUser user = jdbcTemplate.query(sql, new AppUserMapper(authorities), email).stream()
                    .findFirst().orElse(null);
            if (user != null) {
                logger.info("User found: " + user.getEmail());
            } else {
                logger.warning("User not found: " + email);
            }
            return user;
        } catch (Exception e) {
            logger.severe("Error finding user by email: " + e.getMessage());
            throw new RuntimeException("Database query error", e);
        }
    }

    @Override
    @Transactional
    public AppUser add(AppUser appUser) {
        logger.info("Adding new user: " + appUser.getEmail());
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

        try {
            int id = insert.executeAndReturnKey(args).intValue();
            appUser.setId(id);
            logger.info("User added with ID: " + id);
            updateRoles(appUser);
            return appUser;
        } catch (Exception e) {
            logger.severe("Error adding user: " + e.getMessage());
            throw new RuntimeException("Database insert error", e);
        }
    }

    @Override
    public void addRoleToUser(int appUserId, int roleId) {
        logger.info("Adding role to user: " + appUserId);
        String sql = """
                insert into app_user_role (app_user_id, role_id)
                values (?, ?);
                """;
        try {
            jdbcTemplate.update(sql, appUserId, roleId);
        } catch (Exception e) {
            logger.severe("Error adding role to user: " + e.getMessage());
            throw new RuntimeException("Database insert error", e);
        }
    }

    @Override
    @Transactional
    public void save(AppUser appUser) {
        logger.info("Saving user: " + appUser.getEmail());
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
            try {
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
                logger.info("User updated: " + appUser.getEmail());
                updateRoles(appUser);
            } catch (Exception e) {
                logger.severe("Error saving user: " + e.getMessage());
                throw new RuntimeException("Database update error", e);
            }
        }
    }

    private void updateRoles(AppUser appUser) {
        logger.info("Updating roles for user: " + appUser.getId());
        try {
            jdbcTemplate.update("delete from app_user_role where app_user_id = ?;", appUser.getId());
            for (var authority : appUser.getAuthorities()) {
                String sql = """
                        insert into app_user_role (app_user_id, role_id)
                        values (?, (select id from role where `name` = ?));
                        """;
                jdbcTemplate.update(sql, appUser.getId(), authority.getAuthority());
            }
        } catch (Exception e) {
            logger.severe("Error updating roles for user: " + e.getMessage());
            throw new RuntimeException("Database update error", e);
        }
    }

    private List<String> getAuthorities(String email) {
        logger.info("Getting authorities for user: " + email);
        final String sql = """
                select
                    r.name
                from role r
                inner join app_user_role ur on ur.role_id = r.id
                inner join app_user u on u.id = ur.app_user_id
                where u.email = ?;
                """;
        try {
            return jdbcTemplate.query(sql, (rs, i) -> rs.getString("name"), email);
        } catch (Exception e) {
            logger.severe("Error getting authorities for user: " + e.getMessage());
            throw new RuntimeException("Database query error", e);
        }
    }
}
