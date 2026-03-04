// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CertificateVerification
 * @dev Stores and verifies certificate hashes to prevent fraud.
 */
contract CertificateVerification {
    
    // Mapping from certificate ID to its SHA-256 hash
    mapping(string => string) private certificates;
    
    // Event emitted when a certificate is stored
    event CertificateStored(string indexed certId, string hash);

    /**
     * @dev Stores the hash of a certificate. Only allows storing once per certificate ID.
     * @param _certId Unique identifier for the certificate.
     * @param _hash SHA-256 hash of the certificate data.
     */
    function storeCertificate(string memory _certId, string memory _hash) public {
        bytes memory certIdBytes = bytes(_certId);
        require(certIdBytes.length > 0, "Certificate ID cannot be empty");
        require(bytes(certificates[_certId]).length == 0, "Certificate already exists");
        
        certificates[_certId] = _hash;
        
        emit CertificateStored(_certId, _hash);
    }

    /**
     * @dev Verifies a certificate by returning its stored hash.
     * @param _certId Unique identifier for the certificate.
     * @return The stored hash if found, otherwise an empty string.
     */
    function verifyCertificate(string memory _certId) public view returns (string memory) {
        return certificates[_certId];
    }
}
