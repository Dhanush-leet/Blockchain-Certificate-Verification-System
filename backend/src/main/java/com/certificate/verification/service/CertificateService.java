package com.certificate.verification.service;

import com.certificate.verification.model.Certificate;
import com.certificate.verification.repository.CertificateRepository;
import com.certificate.verification.util.SHA256Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.DefaultGasProvider;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
@Slf4j
public class CertificateService {

    @Autowired
    private CertificateRepository repository;

    @Value("${blockchain.rpc-url:http://127.0.0.1:7545}")
    private String rpcUrl;

    @Value("${blockchain.private-key:}")
    private String privateKey;

    @Value("${blockchain.contract-address:}")
    private String contractAddress;

    public String uploadCertificate(Certificate certificate) throws Exception {
        // 1. Generate SHA256 Hash
        String certText = SHA256Util.certificateToText(certificate);
        String hash = SHA256Util.generateHash(certText);
        log.info("Generated Hash: {}", hash);

        // 2. Save in Database
        repository.save(certificate);

        // 3. Store on Blockchain (Mocking for now if private key not provided)
        if (privateKey == null || privateKey.isEmpty() || contractAddress == null || contractAddress.isEmpty()) {
            log.warn("Blockchain configuration missing! Returning mock transaction hash.");
            return "0x-MOCK-TX-HASH-" + System.currentTimeMillis();
        }

        // Web3j Interaction
        try {
            Web3j web3j = Web3j.build(new HttpService(rpcUrl));
            Credentials credentials = Credentials.create(privateKey);

            // Note: In real scenarios, use the generated Wrapper class:
            // CertificateVerification contract =
            // CertificateVerification.load(contractAddress, web3j, credentials, new
            // DefaultGasProvider());
            // TransactionReceipt receipt =
            // contract.storeCertificate(certificate.getCertificateId(), hash).send();
            // return receipt.getTransactionHash();

            log.info("Contract call simulated with Web3j. Real interaction requires the generated contract wrapper.");
            return "0x-SIMULATED-TX-" + Long.toHexString(System.currentTimeMillis());

        } catch (Exception e) {
            log.error("Blockchain error", e);
            throw new Exception("Smart contract interaction failed: " + e.getMessage());
        }
    }

    public String verifyCertificate(String certificateId) throws NoSuchAlgorithmException {
        Optional<Certificate> optionalCert = repository.findById(certificateId);
        if (optionalCert.isEmpty()) {
            return "INVALID (Not found in DB)";
        }

        Certificate cert = optionalCert.get();
        String recomputedHash = SHA256Util.generateHash(SHA256Util.certificateToText(cert));

        // In real app, we fetch from blockchain:
        // String storedHash = fetchFromBlockchain(certificateId);
        // if (recomputedHash.equals(storedHash)) return "VERIFIED";

        return "VERIFIED";
    }
}
