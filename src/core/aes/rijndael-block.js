import Rijndael from "./rijndael.js"
import Utils from "./utils.js"

// Available sizes, modes
const SIZES = [16];
const MODES = ['ecb', 'cbc'];

//==============================================================================

class RijndaelBlock {
  constructor(key, mode) {
    let keySize = key.length / 2;

    if (!SIZES.includes(keySize))
      throw new Error(`Unsupported key size: ${keySize  * 8} bit`);

    if (!MODES.includes(mode))
      throw new Error(`Unsupported mode: ${mode}`);


    //this.key = Utils.toArray(key);
    this.key = Utils.hexStringToArray(key)
    console.log("key")
    console.log(this.key)
    this.keySize = keySize;
    this.mode = mode;
  }

  encrypt(_plaintext, blockSize, _iv) {
    blockSize = parseInt(blockSize);

    if (blockSize <= 32 && !SIZES.includes(blockSize))
      throw new Error(`Unsupported block size: ${blockSize * 8} bit`);

    else if (32 < blockSize) {
      blockSize /= 8;

      if (!SIZES.includes(blockSize))
        throw new Error(`Unsupported block size: ${blockSize} bit`);
    }

    if (this.mode === 'cbc') {
      if (!_iv)
        throw new Error(`IV is required for mode ${this.mode}`);

      if (_iv.length !== blockSize)
        throw new Error(`IV size should match with block size (${blockSize * 8} bit)`);
    }

    const plaintext = Utils.toArray(_plaintext);
    console.log("plaintexthex")
    console.log(Utils.intArrayToHexString(plaintext))
    let padLength = plaintext.length % blockSize;

    if (padLength !== 0) padLength = blockSize - padLength;
    while (padLength --> 0) plaintext.push(0);

    const blockCount = plaintext.length / blockSize;
    let ciphertext = new Array(plaintext.length);

    const cipher = new Rijndael(this.key);

    const allInfo = {
      key: this.key, 
      keySize: this.keySize,
      mode: this.mode,
      
    }

    switch (this.mode) {
      case 'ecb':
        for (let i = 0; i < blockCount; i++) {
          const start = i * blockSize;
          const end = (i + 1) * blockSize;
          const block = plaintext.slice(start, end);

          console.log("blockhex")
          console.log(Utils.intArrayToHexString(block))

          const [encrypted, info] = cipher.encrypt(block);
          
          allInfo[`block${i}`] = info;

          for (let j = 0; j < blockSize; j++)
            ciphertext[start + j] = encrypted[j];
        }
        console.log("allinfo")
        console.log(allInfo)
        break;

      case 'cbc':
        let iv = Utils.toArray(_iv);

        for (let i = 0; i < blockCount; i++) {
          const start = i * blockSize;
          const end = (i + 1) * blockSize;
          const block = plaintext.slice(start, end);

          for (let j = 0; j < blockSize; j++)
            block[j] ^= iv[j];

            const [encrypted, info] = cipher.encrypt(block);

          for (let j = 0; j < blockSize; j++)
            ciphertext[start + j] = encrypted[j];

          iv = encrypted.slice();
        }

        break;
    }

    ciphertext = Utils.intArrayToHexString(ciphertext)
    return [ciphertext, allInfo];
  }

}

export default RijndaelBlock