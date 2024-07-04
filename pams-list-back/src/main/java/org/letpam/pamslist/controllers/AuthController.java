package org.letpam.pamslist.controllers;

import org.letpam.pamslist.domain.AppUserService;
import org.letpam.pamslist.domain.Result;
import org.letpam.pamslist.models.AppUser;
import org.letpam.pamslist.models.UserDTO;
import org.letpam.pamslist.security.JwtConvert;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@ConditionalOnWebApplication
@RequestMapping("/api/auth")  // Adding a base path for clarity
public class AuthController {

    private static final Logger logger = Logger.getLogger(AuthController.class.getName());

    private final AppUserService appUserService;
    private final JwtConvert jwtConverter;
    private final AuthenticationManager authenticationManager;

    public AuthController(AppUserService appUserService,
                          JwtConvert jwtConverter,
                          AuthenticationManager authenticationManager) {
        this.appUserService = appUserService;
        this.jwtConverter = jwtConverter;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        logger.info("Received login request for email: " + credentials.get("email"));

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                credentials.get("email"), credentials.get("password"));

        try {
            Authentication authentication = authenticationManager.authenticate(authToken);
            if (authentication.isAuthenticated()) {
                AppUser appUser = (AppUser) authentication.getPrincipal();
                String jwt = jwtConverter.getTokenFromUser(appUser);
                Map<String, String> result = new HashMap<>();
                result.put("jwt_token", jwt);
                logger.info("User authenticated successfully: " + appUser.getEmail());
                return ResponseEntity.ok(result);
            }
        } catch (Exception e) {
            logger.severe("Authentication failed for email: " + credentials.get("email") + " - " + e.getMessage());
        }

        logger.warning("Authentication failed, returning 403 for email: " + credentials.get("email"));
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        logger.info("Received registration request for email: " + userDTO.getEmail());

        Result<AppUser> result = appUserService.add(userDTO);
        if (result.isSuccess()) {
            Map<String, Integer> userId = new HashMap<>();
            userId.put("user_id", result.getPayload().getId());
            logger.info("User registered successfully: " + userDTO.getEmail());
            return new ResponseEntity<>(userId, HttpStatus.CREATED);
        }

        logger.warning("Registration failed for email: " + userDTO.getEmail() + " - " + result.getMessages());
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<Map<String, String>> refreshToken(@AuthenticationPrincipal AppUser appUser) {
        logger.info("Received refresh token request for user: " + appUser.getEmail());

        String jwt = jwtConverter.getTokenFromUser(appUser);
        Map<String, String> result = new HashMap<>();
        result.put("jwt_token", jwt);

        logger.info("Token refreshed successfully for user: " + appUser.getEmail());
        return ResponseEntity.ok(result);
    }
}
