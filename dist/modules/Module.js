var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Module {
    constructor(Core) {
        this.Core = Core;
    }
    static init(Core, name, config, dependencies) {
        return __awaiter(this, void 0, void 0, function* () {
            const ModuleClass = this;
            Core.Modules[name] = new ModuleClass(Core, config, dependencies);
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    postStart() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    restart() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
//# sourceMappingURL=Module.js.map