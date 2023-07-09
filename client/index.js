const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require('readline');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const merkleTree = new MerkleTree(niceList);

  prompt.question('Who are you? \n', async name => {
    console.log(`Hey there ${name}!`);
    const index = niceList.findIndex(n => n === name);
    const proof = merkleTree.getProof(index);
    
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        proof, name
      });
      console.log({ gift });
      prompt.close();
    
  });

  

  
}

main();