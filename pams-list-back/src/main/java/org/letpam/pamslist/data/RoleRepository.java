package org.letpam.pamslist.data;

import org.letpam.pamslist.models.Role;

import java.util.List;

public interface RoleRepository {
    Role findByName(String name);
    List<Role> findAll();
}

