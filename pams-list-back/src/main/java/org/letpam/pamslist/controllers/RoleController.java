package org.letpam.pamslist.controllers;

import org.letpam.pamslist.models.Role;
import org.letpam.pamslist.domain.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/{name}")
    public ResponseEntity<Role> getRoleByName(@PathVariable String name) {
        Role role = roleService.findByName(name);
        return ResponseEntity.ok(role);
    }

    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleService.getAllRoles();
        return ResponseEntity.ok(roles);
    }
}

