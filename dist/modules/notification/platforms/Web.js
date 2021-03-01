var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import NotificationClass from "../AbstractNotification";
export var WebDependencies;
(function (WebDependencies) {
    WebDependencies[WebDependencies["window"] = 0] = "window";
})(WebDependencies || (WebDependencies = {}));
export default class WebNotification extends NotificationClass {
    constructor(core, config) {
        super();
        this.core = core;
        this.config = config;
        this.hasPermission = false;
    }
    checkPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Notification.permission === "granted") {
                this.hasPermission = true;
                return true;
            }
            else {
                return false;
            }
        });
    }
    requestPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            const permission = yield Notification.requestPermission();
            if (permission === "granted") {
                this.hasPermission = true;
            }
            else {
                this.hasPermission = false;
            }
        });
    }
    addEventListener(cb) {
    }
    updateToken() {
    }
    newNotification(data) {
        if (this.hasPermission) {
            let n = new Notification(data.title, { body: data.text });
            n.onclick = () => {
            };
            n.onclose = () => {
            };
        }
    }
}
//# sourceMappingURL=Web.js.map