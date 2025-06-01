# Immutable Supply Chain dApp

This repository contains an end-to-end decentralized application (dApp) for tracking products along a supply chain. It includes:

- **Smart Contracts** (Solidity, Hardhat) deployed on the Sepolia testnet
- **Backend API** (Flask, Web3.py) serving on-chain data
- **Frontend UI** (React, Vite, Chakra UI, ethers.js) for user interaction

---

## Prerequisites

- Node.js (v16+)
- npm
- Python 3.x
- pip
- Hardhat (`npm install --save-dev hardhat`)
- Git

---

## Setup

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd supply_chain_app
   ```

2. **Root environment**
   - Copy `.env.example` (if provided) or create a `.env` in the project root with:
     ```env
     SEPOLIA_URL=<Alchemy RPC URL>
     PRIVATE_KEY=<Deployer private key>
     CONTRACT_ADDRESS=<Deployed contract address>
     ```

3. **Backend**
   ```bash
   cd backend
   pip install flask flask-cors web3 python-dotenv
   set FLASK_APP=app.py      # Windows PowerShell
   flask run --host 0.0.0.0 --port 5000
   ```
   The API will run at `http://localhost:5000`.

4. **Frontend**
   ```bash
   cd ../frontend
   npm install
   ```
   - Create `frontend/.env`:
     ```env
     VITE_CONTRACT_ADDRESS=<same contract address>
     VITE_API_URL=http://127.0.0.1:5000
     ```
   - Start dev server:
     ```bash
     npm run dev
     ```
   The UI will run at `http://localhost:5173`.

---

## Contract Deployment

To deploy or redeploy the contract:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

---

## Testing

- **Smart contract tests**:
  ```bash
  npx hardhat test
  ```

---

## Next Steps

- Verify contract on Etherscan
- Add unit/integration tests
- Deploy frontend (Netlify, Vercel)
- Dockerize backend

---

## License

BSD-3-Clause
