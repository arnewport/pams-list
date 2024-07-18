package org.letpam.pamslist.domain;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {
    private final SendGrid sendGrid;

    public EmailService(SendGrid sendGrid) {
        this.sendGrid = sendGrid;
    }

    public String sendEmail(List<String> toEmails, String subject, String templateId, Map<String, String> templateData) throws IOException {
        Mail mail = new Mail();
        Email fromEmail = new Email("anewport@outlook.com");
        mail.setFrom(fromEmail);
        mail.setSubject(subject);

        for (String toEmail : toEmails) {
            Personalization personalization = new Personalization();
            Email to = new Email(toEmail);
            personalization.addTo(to);
            for (Map.Entry<String, String> entry : templateData.entrySet()) {
                personalization.addDynamicTemplateData(entry.getKey(), entry.getValue());
            }
            mail.addPersonalization(personalization);
        }

        mail.setTemplateId(templateId);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            return response.getBody();
        } catch (IOException ex) {
            throw ex;
        }
    }
}

