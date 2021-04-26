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
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = matrixcs.createClient(this.config.home);
        });
    }
}
//# sourceMappingURL=Matrix.js.map