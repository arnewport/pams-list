package org.letpam.pamslist.domain;

import org.letpam.pamslist.data.RoleRepository;
import org.letpam.pamslist.models.Role;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
