var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
export default class HTTP {
    constructor(config, authorizaionHeader) {
        this.config = config;
        this.authorizaionHeader = authorizaionHeader;
        this.setup();
    }
    setup() {
        axios.defaults.baseURL = this.config.path + this.config.apiVersion + "/";
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.authorizaionHeader;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        this.ax = axios;
    }
    get(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.ax.get(...args)).data;
        });
    }
    post(...args) {
        return this.ax.post(...args);
    }
}
//# sourceMappingURL=HTTP.js.map