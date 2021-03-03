var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MobileLifecycle from "./platforms/Mobile";
import WebLifecycle from "./platforms/Web";
import Module from "../Module";
import { PlatformState } from "../../constants/Platform";
export default class AppManager extends Module {
    constructor(core, config, dependencyInjection) {
        super(core);
        this.config = config;
        this.dependencyInjection = dependencyInjection;
        if (this.core.constants.platform.state === PlatformState.Mobile) {
            this.lifecycle = new MobileLifecycle(dependencyInjection);
        }
        else if (this.core.constants.platform.state === PlatformState.Web) {
            this.lifecycle = new WebLifecycle();
        }
    }
    postStart() {
        return __awaiter(this, void 0, void 0, function* () {
            this.lifecycle.start();
        });
    }
    restart() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
//# sourceMappingURL=AppManager.js.map