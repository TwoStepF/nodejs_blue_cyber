import express from "express";
import AuthService from "../services/auth.service";
import CryptoService from "../../common/services/crypto.service";

class AuthController {
    async inputKey(req: express.Request, res: express.Response){
        const status = await AuthService.inputKey(req.body.key);
        res.status(200).json(status);
    }
    async decode(req: express.Request, res: express.Response){
        try {
            const key = "3nfpfnDv6cPh6XI982l00nVoZJfhrKADEhflXG7e0uw="
            const hexText = "pmQPOTQltRI/C9GGvWfrzcfa8xy8lr72Z3DCJQ==";
            const text = Buffer.from(hexText, "base64");
            res.json(await CryptoService.decrypt(key, text))
        }catch (e){
            res.status(400).json(e)
        }
    }
    async checkKeyToDecode(req: express.Request, res: express.Response){
        let Status = await AuthService.checkKeyToDecode(req.body.key)
        res.status(Status.status).json(Status)
    }
}

export default new AuthController()