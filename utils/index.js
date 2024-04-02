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

export function generateRandomOTP() {
    return Math.floor(Math.random() * 900000 + 100000);
  }