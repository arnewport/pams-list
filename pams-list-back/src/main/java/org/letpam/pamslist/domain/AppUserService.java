package org.letpam.pamslist.domain;

import org.letpam.pamslist.data.AppUserRepository;
import org.letpam.pamslist.data.RoleRepository;
import org.letpam.pamslist.models.AppUser;
import org.letpam.pamslist.models.Role;
import org.letpam.pamslist.models.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUserService(AppUserRepository appUserRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.appUserRepository = appUserRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AppUser findByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    @Override
    public AppUser loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByEmail(email);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(String.format("%s not found.", email));
        }

        return appUser;
    }

    public Result<AppUser> add(UserDTO userDTO) {
        Result<AppUser> result = validate(userDTO.getEmail(), userDTO.getPassword());
        if (!result.isSuccess()) {
            return result;
        }

        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());

        AppUser appUser = new AppUser(
                0, // id
                userDTO.getEmail(), // email
                encodedPassword, // passwordHash
                userDTO.getFirstName(), // firstName
                userDTO.getLastName(), // lastName
                userDTO.getOrganizationId(), // organizationId
                userDTO.getPhoneNumber(), // phoneNumber
                Optional.ofNullable(userDTO.getFaxNumber()), // faxNumber
                null, // lastLogin (assuming this is set later)
                true, // enabled
                List.of("USER") // authorities
        );

        appUserRepository.save(appUser);

        // Assign roles
        Role defaultRole = roleRepository.findByName("USER");
        appUserRepository.addRoleToUser(appUser.getId(), defaultRole.getId());

        result.setPayload(appUser);

        return result;
    }

    private Result<AppUser> validate(String email, String password) {
        Result<AppUser> result = new Result<>();

        if (email == null || email.isBlank()) {
            result.addMessage("email is required");
        }

        if (password == null || password.isBlank()) {
            result.addMessage("password is required");
        }

        if (!result.isSuccess()) {
            return result;
        }

        if (email.length() > 50) {
            result.addMessage("email must be 50 characters max");
        }

        if (!validatePassword(password)) {
            result.addMessage("password must be at least 8 characters and contain a digit, a letter, and a non-digit/non-letter");
        }

        if (!result.isSuccess()) {
            return result;
        }

        try {
            if (loadUserByUsername(email) != null) {
                result.addMessage("the provided email already exists");
            }
        } catch (UsernameNotFoundException e) {
            // good!
        }

        return result;
    }

    private boolean validatePassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        return digits > 0 && letters > 0 && others > 0;
    }
}
