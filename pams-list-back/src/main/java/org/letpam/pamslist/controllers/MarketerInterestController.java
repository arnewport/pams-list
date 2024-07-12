package org.letpam.pamslist.controllers;

import org.letpam.pamslist.models.MarketerInterest;
import org.letpam.pamslist.domain.MarketerInterestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/marketer-interest")
public class MarketerInterestController {

    private final MarketerInterestService service;

    public MarketerInterestController(MarketerInterestService service) {
        this.service = service;
    }

    @GetMapping("/check-interest")
    public ResponseEntity<MarketerInterest> checkInterest(
            @RequestParam int marketerId, @RequestParam int patientId) {
        MarketerInterest interest = service.findByMarketerIdAndPatientId(marketerId, patientId);
        if (interest != null) {
            return ResponseEntity.ok(interest);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
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
