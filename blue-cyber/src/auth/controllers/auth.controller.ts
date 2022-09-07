import express from "express";
import AuthService from "../services/auth.service";
import CryptoService from "../../common/services/crypto.service";

class AuthController {
    async inputKey(req: express.Request, res: express.Response){
        const status = await AuthService.inputKey('3nfpfnDv6cPh6XI982l00nVoZJfhrKADEhflXG7e0uw=');
        res.status(200).json(status);
    }
    async decode(req: express.Request, res: express.Response){
        try {
            const key = "3nfpfnDv6cPh6XI982l00nVoZJfhrKADEhflXG7e0uw="
            const hexText = "pz4LRkojjYusGPi74QrIZ2rv2Tg9NrLEvJH9tC4=";
            const text = Buffer.from(hexText, "base64");
            res.json(await CryptoService.decrypt(key, text))
        }catch (e){
            res.status(400).json(e)
        }
    }
}

export default new AuthController()