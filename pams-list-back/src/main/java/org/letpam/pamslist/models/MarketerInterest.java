package org.letpam.pamslist.models;

import java.util.Date;
import java.util.Objects;

public class MarketerInterest {
    private int id;
    private int marketerId;
    private int patientId;
    private Date dateInterested;
    private Date dateAccepted;
    private Date dateRejected;
    private String rejectionReason;
    private String status;

    public MarketerInterest(int id, int marketerId, int patientId, Date dateInterested, Date dateAccepted, Date dateRejected, String rejectionReason, String status) {
        this.id = id;
        this.marketerId = marketerId;
        this.patientId = patientId;
        this.dateInterested = dateInterested;
        this.dateAccepted = dateAccepted;
        this.dateRejected = dateRejected;
        this.rejectionReason = rejectionReason;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMarketerId() {
        return marketerId;
    }

    public void setMarketerId(int marketerId) {
        this.marketerId = marketerId;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public Date getDateInterested() {
        return dateInterested;
    }

    public void setDateInterested(Date dateInterested) {
        this.dateInterested = dateInterested;
    }

    public Date getDateAccepted() {
        return dateAccepted;
    }

    public void setDateAccepted(Date dateAccepted) {
        this.dateAccepted = dateAccepted;
    }

    public Date getDateRejected() {
        return dateRejected;
    }

    public void setDateRejected(Date dateRejected) {
        this.dateRejected = dateRejected;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MarketerInterest that = (MarketerInterest) o;
        return id == that.id && marketerId == that.marketerId && patientId == that.patientId && Objects.equals(dateInterested, that.dateInterested) && Objects.equals(dateAccepted, that.dateAccepted) && Objects.equals(dateRejected, that.dateRejected) && Objects.equals(rejectionReason, that.rejectionReason) && Objects.equals(status, that.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, marketerId, patientId, dateInterested, dateAccepted, dateRejected, rejectionReason, status);
    }
}

