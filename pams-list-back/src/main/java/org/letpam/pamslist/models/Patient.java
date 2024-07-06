package org.letpam.pamslist.models;

import java.util.Date;
import java.util.Objects;

public class Patient {
    private int id;
    private String firstName;
    private String lastName;
    private int age;
    private String sex;
    private boolean readyForDischarge;
    private boolean medicare;
    private boolean mediCal;
    private String medicarePlan;
    private String mediCalPlan;
    private boolean hmo;
    private boolean ppo;
    private boolean va;
    private boolean loaAvailable;
    private boolean alw;
    private boolean subacute;
    private boolean iso;
    private boolean requiresLocked;
    private String patientNotes;
    private Date dateOfHospitalAdmission;
    private Date dateAddedToPamList;
    private Date datePlacedOrWithdrawn;
    private int totalInterested;
    private int totalRejected;
    private int managerId;
    private int managerOrganizationId;
    private Integer marketerId;
    private Integer marketerOrganizationId;
    private String patientStatus;
    private String trackingStatus;
    private String expectedSnfDischargeType;
    private boolean archived;

    // Constructor
    public Patient(int id, String firstName, String lastName, int age, String sex, boolean readyForDischarge, boolean medicare,
                   boolean mediCal, String medicarePlan, String mediCalPlan, boolean hmo, boolean ppo, boolean va, boolean loaAvailable,
                   boolean alw, boolean subacute, boolean iso, boolean requiresLocked, String patientNotes, Date dateOfHospitalAdmission,
                   Date dateAddedToPamList, Date datePlacedOrWithdrawn, int totalInterested, int totalRejected, int managerId,
                   int managerOrganizationId, Integer marketerId, Integer marketerOrganizationId, String patientStatus,
                   String trackingStatus, String expectedSnfDischargeType, boolean archived) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.sex = sex;
        this.readyForDischarge = readyForDischarge;
        this.medicare = medicare;
        this.mediCal = mediCal;
        this.medicarePlan = medicarePlan;
        this.mediCalPlan = mediCalPlan;
        this.hmo = hmo;
        this.ppo = ppo;
        this.va = va;
        this.loaAvailable = loaAvailable;
        this.alw = alw;
        this.subacute = subacute;
        this.iso = iso;
        this.requiresLocked = requiresLocked;
        this.patientNotes = patientNotes;
        this.dateOfHospitalAdmission = dateOfHospitalAdmission;
        this.dateAddedToPamList = dateAddedToPamList;
        this.datePlacedOrWithdrawn = datePlacedOrWithdrawn;
        this.totalInterested = totalInterested;
        this.totalRejected = totalRejected;
        this.managerId = managerId;
        this.managerOrganizationId = managerOrganizationId;
        this.marketerId = marketerId;
        this.marketerOrganizationId = marketerOrganizationId;
        this.patientStatus = patientStatus;
        this.trackingStatus = trackingStatus;
        this.expectedSnfDischargeType = expectedSnfDischargeType;
        this.archived = archived;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public boolean isReadyForDischarge() {
        return readyForDischarge;
    }

    public void setReadyForDischarge(boolean readyForDischarge) {
        this.readyForDischarge = readyForDischarge;
    }

    public boolean isMedicare() {
        return medicare;
    }

    public void setMedicare(boolean medicare) {
        this.medicare = medicare;
    }

    public boolean isMediCal() {
        return mediCal;
    }

    public void setMediCal(boolean mediCal) {
        this.mediCal = mediCal;
    }

    public String getMedicarePlan() {
        return medicarePlan;
    }

    public void setMedicarePlan(String medicarePlan) {
        this.medicarePlan = medicarePlan;
    }

    public String getMediCalPlan() {
        return mediCalPlan;
    }

    public void setMediCalPlan(String mediCalPlan) {
        this.mediCalPlan = mediCalPlan;
    }

    public boolean isHmo() {
        return hmo;
    }

    public void setHmo(boolean hmo) {
        this.hmo = hmo;
    }

    public boolean isPpo() {
        return ppo;
    }

    public void setPpo(boolean ppo) {
        this.ppo = ppo;
    }

    public boolean isVa() {
        return va;
    }

    public void setVa(boolean va) {
        this.va = va;
    }

    public boolean isLoaAvailable() {
        return loaAvailable;
    }

    public void setLoaAvailable(boolean loaAvailable) {
        this.loaAvailable = loaAvailable;
    }

    public boolean isAlw() {
        return alw;
    }

    public void setAlw(boolean alw) {
        this.alw = alw;
    }

    public boolean isSubacute() {
        return subacute;
    }

    public void setSubacute(boolean subacute) {
        this.subacute = subacute;
    }

    public boolean isIso() {
        return iso;
    }

    public void setIso(boolean iso) {
        this.iso = iso;
    }

    public boolean isRequiresLocked() {
        return requiresLocked;
    }

    public void setRequiresLocked(boolean requiresLocked) {
        this.requiresLocked = requiresLocked;
    }

    public String getPatientNotes() {
        return patientNotes;
    }

    public void setPatientNotes(String patientNotes) {
        this.patientNotes = patientNotes;
    }

    public Date getDateOfHospitalAdmission() {
        return dateOfHospitalAdmission;
    }

    public void setDateOfHospitalAdmission(Date dateOfHospitalAdmission) {
        this.dateOfHospitalAdmission = dateOfHospitalAdmission;
    }

    public Date getDateAddedToPamList() {
        return dateAddedToPamList;
    }

    public void setDateAddedToPamList(Date dateAddedToPamList) {
        this.dateAddedToPamList = dateAddedToPamList;
    }

    public Date getDatePlacedOrWithdrawn() {
        return datePlacedOrWithdrawn;
    }

    public void setDatePlacedOrWithdrawn(Date datePlacedOrWithdrawn) {
        this.datePlacedOrWithdrawn = datePlacedOrWithdrawn;
    }

    public int getTotalInterested() {
        return totalInterested;
    }

    public void setTotalInterested(int totalInterested) {
        this.totalInterested = totalInterested;
    }

    public int getTotalRejected() {
        return totalRejected;
    }

    public void setTotalRejected(int totalRejected) {
        this.totalRejected = totalRejected;
    }

    public int getManagerId() {
        return managerId;
    }

    public void setManagerId(int managerId) {
        this.managerId = managerId;
    }

    public int getManagerOrganizationId() {
        return managerOrganizationId;
    }

    public void setManagerOrganizationId(int managerOrganizationId) {
        this.managerOrganizationId = managerOrganizationId;
    }

    public Integer getMarketerId() {
        return marketerId;
    }

    public void setMarketerId(Integer marketerId) {
        this.marketerId = marketerId;
    }

    public Integer getMarketerOrganizationId() {
        return marketerOrganizationId;
    }

    public void setMarketerOrganizationId(Integer marketerOrganizationId) {
        this.marketerOrganizationId = marketerOrganizationId;
    }

    public String getPatientStatus() {
        return patientStatus;
    }

    public void setPatientStatus(String patientStatus) {
        this.patientStatus = patientStatus;
    }

    public String getTrackingStatus() {
        return trackingStatus;
    }

    public void setTrackingStatus(String trackingStatus) {
        this.trackingStatus = trackingStatus;
    }

    public String getExpectedSnfDischargeType() {
        return expectedSnfDischargeType;
    }

    public void setExpectedSnfDischargeType(String expectedSnfDischargeType) {
        this.expectedSnfDischargeType = expectedSnfDischargeType;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Patient patient = (Patient) o;
        return id == patient.id && age == patient.age && readyForDischarge == patient.readyForDischarge && medicare == patient.medicare && mediCal == patient.mediCal && hmo == patient.hmo && ppo == patient.ppo && va == patient.va && loaAvailable == patient.loaAvailable && alw == patient.alw && subacute == patient.subacute && iso == patient.iso && requiresLocked == patient.requiresLocked && totalInterested == patient.totalInterested && totalRejected == patient.totalRejected && managerId == patient.managerId && managerOrganizationId == patient.managerOrganizationId && archived == patient.archived && Objects.equals(firstName, patient.firstName) && Objects.equals(lastName, patient.lastName) && Objects.equals(sex, patient.sex) && Objects.equals(medicarePlan, patient.medicarePlan) && Objects.equals(mediCalPlan, patient.mediCalPlan) && Objects.equals(patientNotes, patient.patientNotes) && Objects.equals(dateOfHospitalAdmission, patient.dateOfHospitalAdmission) && Objects.equals(dateAddedToPamList, patient.dateAddedToPamList) && Objects.equals(datePlacedOrWithdrawn, patient.datePlacedOrWithdrawn) && Objects.equals(marketerId, patient.marketerId) && Objects.equals(marketerOrganizationId, patient.marketerOrganizationId) && Objects.equals(patientStatus, patient.patientStatus) && Objects.equals(trackingStatus, patient.trackingStatus) && Objects.equals(expectedSnfDischargeType, patient.expectedSnfDischargeType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, age, sex, readyForDischarge, medicare, mediCal, medicarePlan, mediCalPlan, hmo, ppo, va, loaAvailable, alw, subacute, iso, requiresLocked, patientNotes, dateOfHospitalAdmission, dateAddedToPamList, datePlacedOrWithdrawn, totalInterested, totalRejected, managerId, managerOrganizationId, marketerId, marketerOrganizationId, patientStatus, trackingStatus, expectedSnfDischargeType, archived);
    }
}

