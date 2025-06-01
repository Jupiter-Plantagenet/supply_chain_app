import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from web3 import Web3
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from root .env
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(env_path)

SEPOLIA_URL = os.getenv("SEPOLIA_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")

# Initialize Web3
w3 = Web3(Web3.HTTPProvider(SEPOLIA_URL))
account = w3.eth.account.from_key(PRIVATE_KEY)

# Load contract ABI
artifact_path = os.path.join(os.path.dirname(__file__), '..', 'artifacts', 'contracts', 'SupplyChain.sol', 'SupplyChain.json')
with open(artifact_path) as f:
    contract_json = json.load(f)
abi = contract_json["abi"]

# Instantiate contract
contract = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=abi)

# Flask setup
app = Flask(__name__)
CORS(app)

# Helper to build, sign, and send tx
def send_transaction(fn):
    nonce = w3.eth.get_transaction_count(account.address)
    tx = fn.build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': 3000000,
        'gasPrice': w3.to_wei('20', 'gwei')
    })
    signed = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
    # Wait for the transaction to be mined before returning
    w3.eth.wait_for_transaction_receipt(tx_hash)
    return tx_hash.hex()

@app.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    name = data.get('name')
    origin = data.get('origin')
    try:
        tx_hash = send_transaction(contract.functions.addProduct(name, origin))
        return jsonify({'txHash': tx_hash}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/products', methods=['GET'])
def list_products():
    try:
        count = contract.functions.productCount().call()
        prods = []
        for i in range(1, count + 1):
            p = contract.functions.getProduct(i).call()
            prods.append({
                'id': p[0], 'name': p[1], 'origin': p[2],
                'owner': p[3], 'status': p[4], 'timestamp': p[5]
            })
        return jsonify(prods), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    try:
        p = contract.functions.getProduct(id).call()
        product = {
            'id': p[0],
            'name': p[1],
            'origin': p[2],
            'owner': p[3],
            'status': p[4],
            'timestamp': p[5]
        }
        return jsonify(product), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/products/<int:id>/history', methods=['GET'])
def get_history(id):
    try:
        history = contract.functions.getProductHistory(id).call()
        data = []
        for h in history:
            data.append({
                'id': h[0],
                'name': h[1],
                'origin': h[2],
                'owner': h[3],
                'status': h[4],
                'timestamp': h[5]
            })
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/products/<int:id>/status', methods=['POST'])
def update_status(id):
    data = request.get_json()
    status = data.get('status')
    try:
        tx_hash = send_transaction(contract.functions.updateStatus(id, status))
        return jsonify({'txHash': tx_hash}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/products/<int:id>/transfer', methods=['POST'])
def transfer(id):
    data = request.get_json()
    new_owner = data.get('newOwner')
    try:
        tx_hash = send_transaction(contract.functions.transferProductOwnership(id, Web3.to_checksum_address(new_owner)))
        return jsonify({'txHash': tx_hash}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
