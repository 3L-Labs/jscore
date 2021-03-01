var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Server from "../Server";
import HTTP from "../libs/HTTP";
import { CommunicationTypes } from "../../ClientContext";
import Socket from "../libs/Socket";
import PubSub, { PubSubTypes } from "../libs/PubSub";
export default class SpringBoot extends Server {
    constructor(opts) {
        super();
        this.opts = opts;
        this.tokens = {
            idToken: opts.idToken,
            accessToken: opts.accessToken
        };
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pubsub = new PubSub();
            yield Promise.all(this.opts.config.communicationTypes.map((type) => {
                switch (type) {
                    case CommunicationTypes.http:
                        this.http = new HTTP(this.opts.config, this.tokens.accessToken);
                        return 'Success';
                    case CommunicationTypes.sse:
                        return 'Success';
                    case CommunicationTypes.socket:
                        return this.pubsub.newPubsub(PubSubTypes.Socket, new Socket(this.opts, this.tokens.accessToken));
                    default:
                        break;
                }
            }));
            yield this.sanityCheck();
        });
    }
    sanityCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.http) {
                try {
                    yield this.http.get("/ping");
                }
                catch (e) {
                    console.log("# ClientContext : sanity check failed ", e);
                }
            }
        });
    }
}
//# sourceMappingURL=SpringBoot.js.map