package org.letpam.pamslist.data;

import org.letpam.pamslist.models.AppUser;

import java.util.List;

public interface AppUserRepository {
    AppUser findById(int id);
    AppUser findByEmail(String email);
    AppUser add(AppUser appUser);
    void addRoleToUser(int appUserId, int roleId);
    void save(AppUser appUser);
    List<AppUser> findUnverifiedUsers();
    boolean verifyUser(int id);
    boolean deleteUser(int id);
}
