package org.letpam.pamslist.data;

import org.letpam.pamslist.models.Organization;

import java.util.List;

public interface OrganizationRepository {
    Organization findById(int id);
    List<Organization> findAll();
    Organization add(Organization organization);
    boolean update(Organization organization);
    boolean deleteById(int id);
}