package org.letpam.pamslist.data;

import org.letpam.pamslist.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AppUserRepository {

    AppUser findByUsername(String username);
    AppUser add(AppUser appUser);

}

