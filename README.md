# Blockchain Certificate Verification System 🎓⛓️

A modern decentralized application (DApp) that ensures academic certificate authenticity by anchoring SHA-256 hashes to the Ethereum blockchain. This prevents fraud and allows instant, immutable verification.

---

## 🚀 Key Features

*   **Immutable Ledger**: Once recorded on blockchain, certificates cannot be forged or modified.
*   **SHA-256 Hashing**: High-security cryptographic hashing for certificate metadata validation.
*   **QR Code Integration**: Every certificate generates a unique QR code for seamless verification.
*   **Decentralized**: Powered by Solidity smart contracts and Ethereum.
*   **Premium UI**: Glassmorphism dashboard style with smooth animations.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS, Framer Motion, Ethers.js |
| **Backend** | Java Spring Boot, Maven, JPA (H2/PostgreSQL) |
| **Blockchain** | Solidity, Ganache, Remix IDE, MetaMask |
| **Utilities** | Lucide-React, ZXing/Html5-QRCode, QRCode.react |

---

## 🏗️ Getting Started

### 1. Smart Contract Setup (Blockchain)
1.  Install **[Ganache](https://trufflesuite.com/ganache/)** and start a workspace (usually `http://127.0.0.1:7545`).
2.  Open **[Remix IDE](https://remix.ethereum.org/)**.
3.  Create a file `CertificateVerification.sol` and paste the code from `/blockchain/contracts/`.
4.  Compile (Solidity 0.8.x).
5.  Deploy choosing "Injected Provider - MetaMask" (Connect MetaMask to Ganache network first).
6.  **Important**: Copy the deployed `Contract Address`.

### 2. Backend Setup (Spring Boot)
1.  Navigate to `/backend/`.
2.  Open `src/main/resources/application.properties`.
    *   Set `blockchain.rpc-url` to your Ganache RPC URL.
    *   Add your Ganache Account Private Key to `blockchain.private-key`.
    *   Add your deployed `blockchain.contract-address`.
3.  Run the application using:
    ```bash
    mvn spring-boot:run
    ```

### 3. Frontend Setup (React)
1.  Navigate to `/frontend/`.
2.  Update `/src/services/BlockchainService.js` with your deployed `CONTRACT_ADDRESS`.
3.  Install dependencies and run:
    ```bash
    npm install
    npm run dev
    ```

---

## 🔒 Security Workflow

1.  **Admin Uploads** student data (ID, Name, Year, etc.) through the React UI.
2.  **Spring Boot Backend** receives data and generates a unique **SHA-256 hash**.
3.  **The Backend** interacts with the **Smart Contract** to store the mapping `certId -> hash`.
4.  **A QR Code** is generated on the client-side containing the verification deep-link.
5.  **Verifier** scans the QR or enters the ID. The system matches the current certificate data hash against the one on the Blockchain Ledger. 
    *   Match = **Verified ✅**
    *   Mismatch/Not Found = **Tampered ❌**

---

## 🎯 Project Structure

```bash
blockchain-certificate-verification/
├── frontend/             # React (Vite) + Tailwind + Ethers.js
├── backend/              # Spring Boot + Web3j (Hashing & APIs)
└── blockchain/
    └── contracts/        # Solidity Smart Contract
```
