import CryptoJS from 'crypto-js';

const secretKey = "MySecretKey12345";

const decryptData = (encryptedData: string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedText); 
    } catch (error) {
        console.error('Error decrypting data:', error);
        throw error;
    }
}

export default decryptData;