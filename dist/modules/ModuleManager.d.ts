import AppManager from "./appManager/AppManager";
import ClientContext from "./clientContext/ClientContext";
import Notification from "./notification/Notification";
import Log from "./log/Log";
import Comm from "./comm/Comm";
export default class ModuleManager {
    AppManager?: AppManager;
    ClientContext?: ClientContext;
    Notification?: Notification;
    Log?: Log;
    Comm?: Comm;
}
