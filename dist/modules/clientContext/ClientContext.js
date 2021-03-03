var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SpringBoot from './server/integrations/SpringBoot';
import Cognito from './auth/integrations/Cognito';
import Module from '../Module';
import { AuthenticationState } from '../../constants/Authentication';
export var AuthType;
(function (AuthType) {
    AuthType["Chain"] = "Chain";
    AuthType["Cognito"] = "Cognito";
    AuthType["OAuth"] = "OAuth";
    AuthType["None"] = "None";
})(AuthType || (AuthType = {}));
export var ServerType;
(function (ServerType) {
    ServerType["Feathers"] = "Feathers";
    ServerType["SpringBoot"] = "SpringBoot";
})(ServerType || (ServerType = {}));
export var CommunicationTypes;
(function (CommunicationTypes) {
    CommunicationTypes["http"] = "http";
    CommunicationTypes["sse"] = "sse";
    CommunicationTypes["socket"] = "socket";
})(CommunicationTypes || (CommunicationTypes = {}));
export default class ClientContext extends Module {
    constructor(core, config, dependencyInjection) {
        super(core);
        this.config = config;
        this.dependencyInjection = dependencyInjection;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.checkAuth();
                yield this.setupHomeConnection();
            }
            catch (e) {
                yield this.setupHomeConnection();
                throw e;
            }
        });
    }
    checkAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.config.auth.type) {
                case AuthType.Chain:
                    console.error("# clientContext - checkAuth - Chain authenticated is broken");
                    break;
                case AuthType.Cognito:
                    this.auth = new Cognito(this.core.constants.authentication.update
                        .bind(this.core.constants.authentication), this.config.auth.config, this.dependencyInjection.AmazonCognito);
                    yield this.auth.checkLocalAuth();
                    break;
                case AuthType.None:
                    this.core.constants.authentication.update(AuthenticationState.SUCCESS);
                    break;
            }
        });
    }
    logout() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.auth) === null || _a === void 0 ? void 0 : _a.signOut();
            this.auth = undefined;
            this.core.constants.authentication.update(AuthenticationState.ERROR);
            this.start();
        });
    }
    setupHomeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            let home = this.config.server.find(config => config.home);
            if (!home) {
                console.error("# clientContext - setupHomeConntection - No home specified");
                return;
            }
            if (home.type === ServerType.Feathers) {
                console.error("ClientContext - setupHomeConnection - Feathers not supported!");
            }
            else if (home.type === ServerType.SpringBoot) {
                this.home = new SpringBoot({
                    config: home,
                    accessToken: this.auth.accessToken,
                    idToken: this.auth.idToken
                });
                yield this.home.setup();
            }
        });
    }
}
//# sourceMappingURL=ClientContext.js.map