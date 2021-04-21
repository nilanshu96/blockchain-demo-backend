const crypto = require('crypto');

function calculateHash(data) {
    return crypto
        .createHash("sha256")
        .update(data)
        .digest("hex");
}

function hasThreeLeadingZeros(hash) {
    if (!hash) return false;
    return "000" === String(hash).slice(0, 3);
}

function generateBlock(data, prevHash, nonce, idx) {
    const blockData = String(data);

    let newIsValid = true;
    const hash = calculateHash(blockData + prevHash + nonce);

    if (!hasThreeLeadingZeros(hash)) {
        newIsValid = false;
    }

    return {
        data: data,
        idx: idx,
        prevHash: prevHash,
        hash: hash,
        nonce: nonce,
        isValid: newIsValid,
        createdAt: new Date().toISOString()
    }
}

function generateValidBlock(data, prevHash, prevIdx) {
    const blockData = String(data);
    let nonce = -1;
    let hash = null;

    while (!hasThreeLeadingZeros(hash)) {
        nonce++;
        hash = calculateHash(blockData + prevHash + nonce);
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
    generateBlock,
    generateValidBlock
}