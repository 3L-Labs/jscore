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
import ExpoNotification from "./platforms/Expo";
import WebNotification from "./platforms/Web";
import { PlatformState } from "../../constants/Platform";
export default class Notification extends Module {
    constructor(core, config, dependencyInjection) {
        super(core);
        this.config = config;
        this.dependencyInjection = dependencyInjection;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (PlatformState[this.config.platform]) {
                case PlatformState.Web:
                    this.notify = new WebNotification(this.Core, this.config);
                    break;
                case PlatformState.Mobile:
                    this.notify = new ExpoNotification(this.Core, this.config, this.dependencyInjection);
                    break;
                default:
                    console.error("Not supported platform passed to Notification Module!");
                    break;
            }
            if (!this.notify)
                return;
            if (!(yield this.notify.checkPermission())) {
                yield this.notify.requestPermission();
            }
        });
    }
    addListener(listener) {
        return __awaiter(this, void 0, void 0, function* () {
            this.notify.addEventListener(listener);
        });
    }
}
//# sourceMappingURL=Notification.js.map