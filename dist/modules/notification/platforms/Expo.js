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
export default class ExpoNotification extends NotificationClass {
    constructor(Core, config, expoDependencies) {
        super();
        this.Core = Core;
        this.config = config;
        this.listeners = [];
        this.Notifications = expoDependencies.Notifications;
        this.Permissions = expoDependencies.Permissions;
        this.Platform = expoDependencies.Platform;
    }
    checkPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            const { status } = yield this.Permissions.getAsync(this.Permissions.NOTIFICATIONS);
            if (status === "granted") {
                this.hasPermission = true;
                this.createChannels();
                return true;
            }
            else {
                this.hasPermission = false;
                return false;
            }
        });
    }
    createChannels() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.Platform.OS === 'android') {
                this.Notifications.createChannelAndroidAsync('default', {
                    name: 'default',
                    sound: true,
                    priority: 'max',
                    vibrate: [0, 250, 250, 250],
                });
            }
        });
    }
    requestPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            const { status } = yield this.Permissions.askAsync(this.Permissions.NOTIFICATIONS);
            if (status === "granted") {
                this.hasPermission = true;
                this.createChannels();
                this.updateToken();
                return;
            }
            else {
            }
        });
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasPermission) {
                const token = yield this.Notifications.getExpoPushTokenAsync();
                return token;
            }
        });
    }
    updateToken() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getToken();
            (_a = this.Core.Modules.ClientContext) === null || _a === void 0 ? void 0 : _a.home.http.post(this.config.mobile.pushTokenEndpoint, {
                token: token
            });
        });
    }
    addEventListener(cb) {
        this.Notifications.addEventListener(cb);
    }
    newNotification() {
    }
}
//# sourceMappingURL=Expo.js.map