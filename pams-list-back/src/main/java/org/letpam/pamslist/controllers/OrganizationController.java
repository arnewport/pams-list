package org.letpam.pamslist.controllers;

import org.letpam.pamslist.models.Organization;
import org.letpam.pamslist.domain.OrganizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organization")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Organization> getOrganizationById(@PathVariable int id) {
        Organization organization = organizationService.findById(id);
        return ResponseEntity.ok(organization);
    }

    @GetMapping
    public ResponseEntity<List<Organization>> getAllOrganizations() {
        List<Organization> organizations = organizationService.findAll();
        return ResponseEntity.ok(organizations);
    }

    @PostMapping
    public ResponseEntity<Organization> addOrganization(@RequestBody Organization organization) {
        Organization newOrganization = organizationService.add(organization);
        return ResponseEntity.ok(newOrganization);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boolean> updateOrganization(@PathVariable int id, @RequestBody Organization organization) {
        organization.setId(id);
        boolean updated = organizationService.update(organization);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteOrganization(@PathVariable int id) {
        boolean deleted = organizationService.deleteById(id);
        return ResponseEntity.ok(deleted);
    }
}
