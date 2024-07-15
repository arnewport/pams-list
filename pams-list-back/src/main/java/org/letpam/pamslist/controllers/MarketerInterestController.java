package org.letpam.pamslist.controllers;

import org.letpam.pamslist.models.MarketerInterest;
import org.letpam.pamslist.domain.MarketerInterestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/marketer-interest")
public class MarketerInterestController {

    private final MarketerInterestService service;

    public MarketerInterestController(MarketerInterestService service) {
        this.service = service;
    }

    @GetMapping("/patient/{patientId}/status")
    public ResponseEntity<List<MarketerInterest>> findAllWithPatientId(@PathVariable int patientId) {
        List<MarketerInterest> interests = service.findAllWithPatientId(patientId);
        if (interests.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(interests, HttpStatus.OK);
    }

    @GetMapping("/check-interest")
    public ResponseEntity<MarketerInterest> checkMarketerInterest(@RequestParam int marketerId, @RequestParam int patientId) {
        Optional<MarketerInterest> marketerInterest = service.findByMarketerIdAndPatientId(marketerId, patientId);
        return marketerInterest.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<MarketerInterest> create(@RequestBody MarketerInterest marketerInterest) {
        MarketerInterest created = service.create(marketerInterest);
        if (created != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{marketerId}/{patientId}")
    public ResponseEntity<Boolean> update(@PathVariable int marketerId, @PathVariable int patientId, @RequestBody MarketerInterest marketerInterest) {
        marketerInterest.setMarketerId(marketerId);
        marketerInterest.setPatientId(patientId);
        boolean updated = service.update(marketerInterest);
        if (updated) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(true);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
    }

    @DeleteMapping("/{marketerId}/{patientId}")
    public ResponseEntity<Boolean> delete(@PathVariable int marketerId, @PathVariable int patientId) {
        boolean deleted = service.delete(marketerId, patientId);
        if (deleted) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(true);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
    }
}
