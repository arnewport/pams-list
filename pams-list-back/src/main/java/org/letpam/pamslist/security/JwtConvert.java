package org.letpam.pamslist.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.letpam.pamslist.models.AppUser;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.List;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtConvert {

    // 1. Signing key
    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    // 2. "Configurable" constants
    private final String ISSUER = "pams-list-api";
    private final int EXPIRATION_MINUTES = 15;
    private final int EXPIRATION_MILLIS = EXPIRATION_MINUTES * 60 * 1000;

    public String getTokenFromUser(AppUser appUser) {
        List<String> authorities = appUser.getAuthorities().stream()
                .map(r -> r.getAuthority()).toList();

        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(appUser.getUsername())
                .claim("authorities", authorities)
                .claim("user_id", appUser.getId())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
                .signWith(key)
                .compact();
    }

    public AppUser getAppUserFromToken(String token) {
        if (token == null || !token.startsWith("Bearer")) {
            return null;
        }

        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .requireIssuer(ISSUER)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.substring(7));

            String username = jws.getBody().getSubject();
            int userId = jws.getBody().get("user_id", Integer.class);
            List<String> authorities = jws.getBody().get("authorities", List.class);

            // Using default values for the fields not available in the token
            String defaultFirstName = "";
            String defaultLastName = "";
            Integer defaultOrganizationId = null;
            String defaultPhoneNumber = "";
            Optional<String> defaultFaxNumber = Optional.empty();
            Date defaultLastLogin = null;

            return new AppUser(
                    userId,
                    username, // email
                    null, // passwordHash is not available in the token
                    defaultFirstName,
                    defaultLastName,
                    defaultOrganizationId,
                    defaultPhoneNumber,
                    defaultFaxNumber,
                    defaultLastLogin,
                    true, // enabled
                    authorities
            );

        } catch (JwtException e) {
            e.printStackTrace();
        }

        return null;
    }

}
