package org.letpam.pamslist.data;

import org.letpam.pamslist.models.AppUser;

public interface AppUserRepository {
    AppUser findById(int id);
    AppUser findByEmail(String email);
    AppUser add(AppUser appUser);
    void addRoleToUser(int appUserId, int roleId);
    void save(AppUser appUser);
}
