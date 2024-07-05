package org.letpam.pamslist.models;

import java.util.Objects;

public class UserDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Integer organizationId;
    private String phoneNumber;
    private String faxNumber;
    private Integer roleId;

    public UserDTO(String email, String password, String firstName, String lastName, Integer organizationId, String phoneNumber, String faxNumber, Integer roleId) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.organizationId = organizationId;
        this.phoneNumber = phoneNumber;
        this.faxNumber = faxNumber;
        this.roleId = roleId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getFaxNumber() {
        return faxNumber;
    }

    public void setFaxNumber(String faxNumber) {
        this.faxNumber = faxNumber;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDTO userDTO = (UserDTO) o;
        return Objects.equals(email, userDTO.email) && Objects.equals(password, userDTO.password) && Objects.equals(firstName, userDTO.firstName) && Objects.equals(lastName, userDTO.lastName) && Objects.equals(organizationId, userDTO.organizationId) && Objects.equals(phoneNumber, userDTO.phoneNumber) && Objects.equals(faxNumber, userDTO.faxNumber) && Objects.equals(roleId, userDTO.roleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, password, firstName, lastName, organizationId, phoneNumber, faxNumber, roleId);
    }

}
