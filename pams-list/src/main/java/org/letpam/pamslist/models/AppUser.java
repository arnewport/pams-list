package org.letpam.pamslist.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class AppUser implements UserDetails {
    private int id;
    private String email;
    private String passwordHash;
    private String firstName;
    private String lastName;
    private Integer organizationId;
    private String phoneNumber;
    private Optional<String> faxNumber;
    private Date lastLogin;
    private boolean enabled;

    private List<SimpleGrantedAuthority> authorities = new ArrayList<>();

    public AppUser() {}

    public AppUser(int id, String email, String passwordHash, String firstName, String lastName,
                   Integer organizationId, String phoneNumber, Optional<String> faxNumber, Date lastLogin,
                   boolean enabled, List<String> authorities) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.organizationId = organizationId;
        this.phoneNumber = phoneNumber;
        this.faxNumber = faxNumber;
        this.lastLogin = lastLogin;
        this.enabled = enabled;
        this.authorities = authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Integer organizationId) {
        this.organizationId = organizationId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Optional<String> getFaxNumber() {
        return faxNumber;
    }

    public void setFaxNumber(Optional<String> faxNumber) {
        this.faxNumber = faxNumber;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.passwordHash;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AppUser appUser = (AppUser) o;
        return id == appUser.id && enabled == appUser.enabled && Objects.equals(email, appUser.email) && Objects.equals(passwordHash, appUser.passwordHash) && Objects.equals(firstName, appUser.firstName) && Objects.equals(lastName, appUser.lastName) && Objects.equals(organizationId, appUser.organizationId) && Objects.equals(phoneNumber, appUser.phoneNumber) && Objects.equals(faxNumber, appUser.faxNumber) && Objects.equals(lastLogin, appUser.lastLogin) && Objects.equals(authorities, appUser.authorities);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, passwordHash, firstName, lastName, organizationId, phoneNumber, faxNumber, lastLogin, enabled, authorities);
    }
}
