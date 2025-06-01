// hardhat.config.js
const path = require('path');
const fs = require('fs');
const envPath = path.resolve(__dirname, '.env');
console.log('hardhat.config.js __dirname:', __dirname, 'cwd:', process.cwd());
console.log('.env exists:', fs.existsSync(envPath), 'path:', envPath);
const result = require('dotenv').config({ path: envPath, debug: true });
console.log('dotenv.config result:', result);
console.log('process.env.SEPOLIA_URL:', process.env.SEPOLIA_URL);
console.log('process.env.PRIVATE_KEY:', process.env.PRIVATE_KEY);

// Hardhat plugins
require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-chai-matchers');

// Validate env
const { SEPOLIA_URL, PRIVATE_KEY } = process.env;
if (!SEPOLIA_URL || !PRIVATE_KEY) {
  throw new Error('Missing SEPOLIA_URL or PRIVATE_KEY in .env');
}

module.exports = {
  solidity: '0.8.17',
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};