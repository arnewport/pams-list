package org.letpam.pamslist.controllers;

import org.letpam.pamslist.domain.AppUserService;
import org.letpam.pamslist.models.AppUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/v1/user")
public class AppUserController {

    private static final Logger logger = Logger.getLogger(AppUserController.class.getName());

    private final AppUserService service;

    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppUser> findById(@PathVariable int id) {
        AppUser appUser = service.findById(id);
        if (appUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(appUser);
    }

    @PostMapping("/find")
    public ResponseEntity<AppUser> findByEmail(@RequestBody String email) {
        logger.info("Received request to find user by email: " + email);
        AppUser appUser = service.findByEmail(email);
        if (appUser == null) {
            logger.warning("User not found: " + email);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        logger.info("User found: " + appUser.getEmail());
        return ResponseEntity.ok(appUser);
    }
}
