package org.letpam.pamslist.data;

import org.letpam.pamslist.models.Role;

import java.util.List;
import java.util.Optional;

public interface RoleRepository {
    Role findByName(String name);
    List<Role> findAll();
    Optional<Role> findById(int id);
}

