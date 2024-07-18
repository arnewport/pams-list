package org.letpam.pamslist.models;

import java.util.List;
import java.util.Map;
import java.util.Objects;

public class EmailRequest {
    private List<String> toEmails;
    private String subject;
    private String templateId;
    private Map<String, String> templateData;

    public EmailRequest(List<String> toEmails, String subject, String templateId, Map<String, String> templateData) {
        this.toEmails = toEmails;
        this.subject = subject;
        this.templateId = templateId;
        this.templateData = templateData;
    }

    public List<String> getToEmails() {
        return toEmails;
    }

    public void setToEmails(List<String> toEmails) {
        this.toEmails = toEmails;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public Map<String, String> getTemplateData() {
        return templateData;
    }

    public void setTemplateData(Map<String, String> templateData) {
        this.templateData = templateData;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmailRequest that = (EmailRequest) o;
        return Objects.equals(toEmails, that.toEmails) && Objects.equals(subject, that.subject) && Objects.equals(templateId, that.templateId) && Objects.equals(templateData, that.templateData);
    }

    @Override
    public int hashCode() {
        return Objects.hash(toEmails, subject, templateId, templateData);
    }
}
