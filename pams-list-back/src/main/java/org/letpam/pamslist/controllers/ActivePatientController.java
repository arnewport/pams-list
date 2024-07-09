package org.letpam.pamslist.controllers;

import org.letpam.pamslist.models.Patient;
import org.letpam.pamslist.domain.ActivePatientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class ActivePatientController {

    private final ActivePatientService activePatientService;

    public ActivePatientController(ActivePatientService activePatientService) {
        this.activePatientService = activePatientService;
    }

    @GetMapping
    public List<Patient> findAll() {
        return activePatientService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> findById(@PathVariable int id) {
        return ResponseEntity.ok(activePatientService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Patient> add(@RequestBody Patient patient) {
        return ResponseEntity.ok(activePatientService.add(patient));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> update(@PathVariable int id, @RequestBody Patient patient) {
        return ResponseEntity.ok(activePatientService.update(id, patient));
    }

    @PutMapping("/{id}/archive")
    public ResponseEntity<String> archive(@PathVariable int id) {
        activePatientService.archive(id);
        return ResponseEntity.ok("{}");
    }
}
