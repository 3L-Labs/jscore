var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Module from "../Module";
const sdk = require("./lib/browser-matrix");
var Environments;
(function (Environments) {
    Environments["dev"] = "dev";
    Environments["prod"] = "prod";
})(Environments || (Environments = {}));
export default class Matrix extends Module {
    constructor(core, config, _dependencyInjection) {
        super(core);
        this.config = config;
        this.isSynced = false;
    }
    start() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = window.localStorage.getItem("matrix");
            let user = {};
            if (userInfo) {
                const parsedUserInfo = JSON.parse(userInfo);
                user = {
                    accessToken: parsedUserInfo.access_token,
                    userId: parsedUserInfo.user_id,
                    deviceId: parsedUserInfo.device_id,
                };
            }
            user = {};
            let opts = { localStorage: window.localStorage };
            let store = new matrixcs.IndexedDBStore({
                indexedDB: window.indexedDB
            });
            yield store.startup();
            this.client = matrixcs.createClient(Object.assign({ baseUrl: this.config.home, store }, user));
            if (Object.keys(user).length > 0) {
                (_a = this.core.modules.clientContext) === null || _a === void 0 ? void 0 : _a.auth.checkLocalAuth();
            }
            console.log("this.client: ", this.client);
        });
    }
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.startClient();
            return new Promise((resolve, reject) => this.client.once('sync', (state, prevState, res) => {
                console.log("prevState: ", prevState);
                console.log("state: ", state);
                console.log("res: ", res);
                this.isSynced = true;
                resolve(state);
            }));
        });
    }
}
//# sourceMappingURL=Matrix.js.map