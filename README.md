# 🎓 Blockchain Certificate Verification System ⛓️

**A Full-Stack Blockchain-Based Credential Storage & Verification Platform**

---

## 📌 Overview

The **Blockchain Certificate Verification System** is a full-stack decentralized application (DApp) designed to securely store and verify academic certificates using blockchain technology.

The system stores **SHA-256 hashes of certificates on the Ethereum blockchain**, ensuring that certificates cannot be altered or forged.

The platform is built using:

- **React (Vite + Tailwind CSS)** for the frontend
- **Spring Boot** for the backend
- **Ethereum Smart Contracts** for certificate storage
- **Ganache** as the local blockchain network
- **MetaMask** for blockchain transaction authentication

This project demonstrates a real-world **Web3 verification architecture** combining blockchain immutability with modern full-stack development.

The system is designed to be:

- 🔐 Secure  
- ⛓️ Immutable  
- ⚡ Fast  
- 📊 Reliable  
- 🎯 Easy to Verify  

---

# 🖥️ Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios
- Ethers.js

## Backend
- Spring Boot
- REST APIs
- SHA-256 Hash Generation
- Web3j Blockchain Integration

## Blockchain
- Solidity Smart Contracts
- Ganache Local Blockchain
- Remix IDE
- MetaMask Wallet

## Database
- PostgreSQL / H2 (optional certificate metadata storage)

## Deployment
- Frontend: **Vercel**
- Backend: **Render / Railway / Localhost**
- Blockchain: **Ganache Local Network**

---

# 📂 Project Structure

blockchain-certificate-verification/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── pom.xml
│
├── blockchain/
│   └── contracts/
│       └── CertificateVerification.sol
│
└── README.md

---

# ✨ Key Features

## 🔐 Blockchain Certificate Storage

Certificates are stored as **SHA-256 hashes** on the Ethereum blockchain.

Once recorded, they become **immutable and tamper-proof**.

---

## ⚡ Instant Certificate Verification

Anyone can verify a certificate by entering its **Certificate ID**.

The system retrieves the blockchain hash and confirms authenticity.

---

## ⛓️ Smart Contract Powered

All certificate records are stored through **Solidity smart contracts** deployed on Ethereum.

---

## 🧾 Unique Certificate Identification

Each certificate is assigned a unique identifier.

Example:

```
ALUM-2024-CIT-012
```

---

## 💳 MetaMask Wallet Integration

Blockchain transactions require **MetaMask authentication**, ensuring secure interaction with the blockchain network.

---

# 🏠 Landing Page

The landing page introduces the system with the concept:

### **Verified Forever**

Once a certificate is stored on the blockchain, it becomes permanently verifiable.

Users can start the system using:

```
INITIATE_SYSTEM

<img width="1919" height="979" alt="Screenshot 2026-03-04 154742" src="https://github.com/user-attachments/assets/c64428e2-8590-4495-a088-d03fc6cb0ce5" />

```
---

# 📦 Certificate Storage Module

This module allows institutions to store certificate hashes on blockchain.

### Required Inputs

- Certificate ID
- SHA-256 Certificate Hash

Example:

```
Certificate ID:
ALUM-2024-CIT-012

SHA256 Hash:
e3b0c44298fc1c149afbf4c8996a427ae41e4649b934ca495991b7852b855
```
<img width="1919" height="981" alt="Screenshot 2026-03-04 154801" src="https://github.com/user-attachments/assets/61edf5fe-ebe4-44df-9428-725397b3f3d4" />


The system executes the smart contract transaction:

```javascript
await contract.storeCertificate(certId, hash)
````

MetaMask will prompt the user to confirm the transaction.

---

# 🔗 MetaMask Transaction Flow

1. Frontend sends blockchain transaction request
2. MetaMask prompts user confirmation
3. Transaction is broadcast to Ethereum network
4. Ganache mines the transaction
5. Certificate hash becomes immutable

Example transaction:

```
Network: Ganache
Gas Fee: 0.0019 ETH
Status: Confirmed
```

<img width="1910" height="1088" alt="Screenshot 2026-03-04 155019" src="https://github.com/user-attachments/assets/ad76bd76-6ea2-4b76-8545-7876b89a5ed7" />

---

# 🔍 Identity Verification Module

Users can verify certificate authenticity using the **Certificate ID**.

Example:

```
ALUM-2024-CIT-012
```

The frontend calls the smart contract:

```javascript
const hash = await contract.verifyCertificate(certId);
```
<img width="1919" height="970" alt="Screenshot 2026-03-04 155035" src="https://github.com/user-attachments/assets/ebcb44ae-e2b1-4ae7-9bcd-e92c26d3f11e" />

---

# ✅ Verification Result

If the certificate matches the blockchain record:

```
Status: VERIFIED_AUTHENTIC
```

The blockchain hash is displayed:

```
e3b0c44298fc1c149afbf4c8996a427ae41e4649b934ca495991b7852b855
```

<img width="1919" height="981" alt="Screenshot 2026-03-04 155056" src="https://github.com/user-attachments/assets/aaddf175-da93-4aad-8d55-4c812f047243" />

This confirms:

✔ Certificate authenticity
✔ Data integrity
✔ Tamper-proof verification

---

# 🔒 Security Workflow

```
Admin Uploads Certificate Data
        │
        ▼
SHA-256 Hash Generated
        │
        ▼
Hash Stored on Blockchain
        │
        ▼
MetaMask Transaction Confirmation
        │
        ▼
Blockchain Ledger Storage
        │
        ▼
Verifier Enters Certificate ID
        │
        ▼
Smart Contract Returns Stored Hash
        │
        ▼
Hash Comparison
```

---

# 🧠 Smart Contract

### Solidity Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {

    mapping(string => string) public certificates;

    function storeCertificate(string memory certId, string memory hash) public {
        require(bytes(certificates[certId]).length == 0, "Certificate already exists");
        certificates[certId] = hash;
    }

    function verifyCertificate(string memory certId) public view returns (string memory) {
        return certificates[certId];
    }
}
```

---

# ⚡ Running the Project

## 1️⃣ Start Blockchain

Start Ganache:

```
http://127.0.0.1:7545
```


---

## 2️⃣ Deploy Smart Contract

1. Open **Remix IDE**
2. Compile `CertificateVerification.sol`
3. Select **Injected Provider – MetaMask**
4. Deploy contract
5. Copy contract address

---

<img width="1919" height="953" alt="image" src="https://github.com/user-attachments/assets/ed374099-6c78-424f-8067-6e06d6157b6c" />

---

# 🎯 Use Cases

This system can be used by:

* Universities
* Certification Authorities
* Training Institutes
* Online Learning Platforms
* HR Departments

to prevent certificate fraud.

---

# 🧠 Challenges Faced

* Smart contract deployment
* MetaMask wallet integration
* Blockchain transaction confirmation handling
* Frontend–backend communication
* SHA-256 hashing consistency
* Ganache network configuration

---

# 🏁 Conclusion

This project demonstrates the development of a **Full-Stack Blockchain Credential Verification Platform**.

By storing certificate hashes on Ethereum, the system ensures:

* Tamper-proof verification
* Transparent validation
* Global trust

The platform can be extended for **real-world academic credential verification systems**.

---

# 📌 Future Enhancements

* IPFS-based certificate file storage
* QR Code certificate verification
* NFT-based certificates
* Multi-university verification network
* Mobile verification application

---

# 🧑‍💻 Author

**Dhanush**

Computer Science and Business Systems (CSBS)

Full-Stack + Blockchain Developer

```

