package com.certificate.verification.controller;

import com.certificate.verification.dto.VerificationResponse;
import com.certificate.verification.model.Certificate;
import com.certificate.verification.service.CertificateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "*") // For local development, allow all
@Slf4j
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadCertificate(@RequestBody Certificate certificate) {
        log.info("Request to upload certificate: {}", certificate);
        try {
            String txHash = certificateService.uploadCertificate(certificate);
            Map<String, String> response = new HashMap<>();
            response.put("certificateId", certificate.getCertificateId());
            response.put("transactionHash", txHash);
            response.put("status", "SUCCESS");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error uploading certificate", e);
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/verify/{certificateId}")
    public ResponseEntity<?> verifyCertificate(@PathVariable String certificateId) {
        log.info("Request to verify certificateId: {}", certificateId);
        try {
            String verifyStatus = certificateService.verifyCertificate(certificateId);
            VerificationResponse response = new VerificationResponse();
            response.setStatus(verifyStatus);
            // Optionally, add more data
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error verifying certificate", e);
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
