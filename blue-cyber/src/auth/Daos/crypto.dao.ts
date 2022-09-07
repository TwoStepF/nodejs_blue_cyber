import MongooesServices from "../../common/services/mongooes.services";
import {Status} from "../../common/StatusRes/status.dto";
import mongoose from "mongoose";
import shortid from 'shortid';

class CryptoDao {
    Schema = MongooesServices.getMongoose().Schema;

    cryptoSchema = new this.Schema({
        _id: { type: String, required: true },
        crypto: { type: String, required: true},
    });

    Crypto = MongooesServices.getMongoose().model('Crypto', this.cryptoSchema);

    constructor() {
        console.log('Created new instance of CryptoDao');
    }

    async crypto(cryptoInput: string) {
        try {
            const Id = shortid.generate();
            const crypto = new this.Crypto({
                _id: Id,
                crypto: cryptoInput
            });
            await crypto.save()
            return new Status(200, 'success', '')
        }catch (err){
            console.log(err)
            return new Status(400, String(err),'')
        }
    }
}

export default new CryptoDao()