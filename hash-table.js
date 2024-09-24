const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    // Your code here
    let str = sha256(key);
    let hex = str.substring(0, 8);
    return parseInt(hex, 16);
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity
  }

  insertNoCollisions(key, value) {
    // Your code here
    let index = this.hashMod(key);
    let node = new KeyValuePair(key, value);

    if (this.data[index]) {
      throw new Error(`hash collision or same key/value pair already exists!`);
    } else {
      this.data[index] = node;
    }

    this.count++;
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    // Note: The bucket will not represent the object itself.
      // Each node is an object
      // Nodes should be structured as a FIFO or FILO

    let index = this.hashMod(key);
    let node = new KeyValuePair(key, value);

    if (this.data[index]) {
      node.next = this.data[index];
      this.data[index] = node;
    } else {
      this.data[index] = node;
    }

    this.count++;
  }

  insert(key, value) {
    // Your code here
  }

}


module.exports = HashTable;
