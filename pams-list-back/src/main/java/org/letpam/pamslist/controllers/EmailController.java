package org.letpam.pamslist.controllers;

import org.letpam.pamslist.domain.EmailService;
import org.letpam.pamslist.models.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public String sendEmail(@RequestBody EmailRequest emailRequest) throws IOException {
        return emailService.sendEmail(
                emailRequest.getToEmails(),
                emailRequest.getSubject(),
                emailRequest.getTemplateId(),
                emailRequest.getTemplateData()
        );
    }
}

