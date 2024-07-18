package org.letpam.pamslist.config;

import com.sendgrid.SendGrid;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SendGridConfig {
    @Bean
    public SendGrid sendGrid() {
        return new SendGrid("SENDGRID_API_KEY");
    }
}
