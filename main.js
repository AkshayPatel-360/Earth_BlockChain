const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.timestamp +
        this.previousHash +
        JSON.stringify(this.data)+
        this.nonce
    ).toString();
  }

  mineBlock(difficulty){
    while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined:" + this.hash)
  }
}



class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2022", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }
}

let earthCoin = new Blockchain();

console.log('Mining block 1...')
earthCoin.addBlock(new Block(1, "20/10/2022", { amount: 4 }));

console.log('Mining block 2...')
earthCoin.addBlock(new Block(2, "22/10/2022", { amount: 440 }));


