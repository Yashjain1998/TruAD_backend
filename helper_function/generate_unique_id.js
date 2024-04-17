import crypto from 'crypto';

// Function to generate a unique ID with a prefix and zero-padded numbers
function generateUniqueId(prefix, length) {
    const randomBytes = crypto.randomBytes(2).toString('hex'); // Generate random hex bytes
    const counter = parseInt(randomBytes, 16); // Convert hex to decimal
    const numPart = String(counter).padStart(length, '0'); // Zero-pad the counter to the specified length
    return `${prefix}-${numPart}`;
}

export default generateUniqueId();
