import crypto from "crypto";
import util from "util";
import {Status} from "../StatusRes/status.dto";
const randomBytes = util.promisify(crypto.randomBytes);
class CryptoService{
    encrypt = async (key: string, plaintext: any) => {
        let Key = Buffer.from(key, 'base64')
        const iv = await randomBytes(12);
        const cipher = crypto.createCipheriv("chacha20-poly1305", Key, iv, {
            authTagLength: 16,
        });
        const encrypted = Buffer.concat([
            cipher.update(plaintext.toString(), "utf-8"),
            cipher.final(),
        ]);
        const tag = cipher.getAuthTag();
        const result = Buffer.concat([iv, tag, encrypted]);
        return result.toString('base64');
    };

    decrypt = async (key: any, encrypted: any) => {
        try {
            const Key = Buffer.from(key, "base64");
            const iv = encrypted.slice(0, 12);
            const tag = encrypted.slice(12, 28);
            const tagBuffer = Buffer.from(tag);
            const cipherText = encrypted.slice(28);
            const decipher = crypto.createDecipheriv("chacha20-poly1305", Key, iv, {
                authTagLength: 16,
            });
            decipher.setAuthTag(tagBuffer);
            const decrypted = Buffer.concat([
                decipher.update(cipherText, "utf-8"),
                decipher.final(),
            ]);
            return decrypted.toString("utf-8");
        }catch (e){
            throw (new Status(400, String(e), ''))
        }

    };
}

export default new CryptoService();