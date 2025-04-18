import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key-2024'; // You should store this in an environment variable

export const encryptData = (data) => {
    try {
        const stringifiedData = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(stringifiedData, SECRET_KEY).toString();
        return encrypted;
    } catch (error) {
        console.error('Encryption error:', error);
        return null;
    }
};

export const decryptData = (encryptedData) => {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const stringifiedData = decrypted.toString(CryptoJS.enc.Utf8);
        return JSON.parse(stringifiedData);
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
}; 