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
var Environments;
(function (Environments) {
    Environments["dev"] = "dev";
    Environments["prod"] = "prod";
})(Environments || (Environments = {}));
export default class Log extends Module {
    constructor(core, config, dependencyInjection) {
        super(core);
        this.config = config;
        this.dependencyInjection = dependencyInjection;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setup();
        });
    }
    setup() {
        if (this.config.env) {
            return;
        }
        const devLog = (type, msg) => {
            if (this.config.env) {
                console.log(`[${type.toUpperCase()}] : ${msg}`);
            }
        };
        console.debug = (msg) => {
            devLog(msg, "debug");
        };
        console.warn = (msg) => {
            devLog(msg, "warn");
        };
        console.error = (msg) => {
            devLog(msg, "error");
        };
    }
}
//# sourceMappingURL=Log.js.map