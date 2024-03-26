import crypto from "crypto";

export function generateRandomToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) {
                reject(err);
            } else {
                resolve(buf.toString("hex"));
            }
        });
    });
}