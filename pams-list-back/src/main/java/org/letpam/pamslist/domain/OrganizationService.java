package org.letpam.pamslist.domain;

import org.letpam.pamslist.data.OrganizationRepository;
import org.letpam.pamslist.models.Organization;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public Organization findById(int id) {
        return organizationRepository.findById(id);
    }

    public List<Organization> findAll() {
        return organizationRepository.findAll();
    }

    public Organization add(Organization organization) {
        return organizationRepository.add(organization);
    }

    public boolean update(Organization organization) {
        return organizationRepository.update(organization);
    }

    public boolean deleteById(int id) {
        return organizationRepository.deleteById(id);
    }
}
