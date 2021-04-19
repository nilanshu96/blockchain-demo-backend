const crypto = require('crypto');

function calculateHash(data) {
    return crypto
    .createHash("sha256")
    .update(data)
    .digest("hex");
}

function hasThreeLeadingZeros(hash) {
    if(!hash) return false;
    return "000" === String(hash).slice(0,3);
}

function generateBlock(data, prevHash, prevIdx) {
    const blockData = String(data);
    let nonce = 0;
    let hash = null;

    while(!hasThreeLeadingZeros(hash)) {
        hash = calculateHash(blockData+prevHash+nonce);
        nonce++;
    }

    return {
        data: data,
        idx: prevIdx + 1,
        prevHash: prevHash,
        hash: hash,
        nonce: nonce,
        isValid: true,
        createdAt: new Date().toISOString()
    }
}

module.exports = {
    generateBlock
}