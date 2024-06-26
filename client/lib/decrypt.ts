import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string; 

const decryptData = (encryptedData:  string) => {
    console.log(ENCRYPTION_KEY)
    try {
        const decipher = crypto.createDecipheriv('aes-192-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.alloc(16));
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
      } catch (error) {
        console.error('Error decrypting data:', error);
        throw error;
      }
};

export default decryptData;