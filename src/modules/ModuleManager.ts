import AppManager from "./appManager/AppManager";
import ClientContext from "./clientContext/ClientContext";
import Notification from "./notification/Notification";
import Log from "./log/Log";
import Comm from "./comm/Comm";

export default class ModuleManager {

    public AppManager?: AppManager;
    public ClientContext?: ClientContext;
    public Notification?: Notification;
    public Log?: Log;
    public Comm?: Comm;

}