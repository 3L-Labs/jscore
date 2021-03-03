import NotificationClass from "../AbstractNotification";
import Core from "../../../Core";
import { NotificationConfig } from "../Notification";
export interface ExpoDependencies {
    Notifications: any;
    Permissions: any;
    Platform: any;
}
export default class ExpoNotification extends NotificationClass {
    private core;
    private config;
    protected hasPermission: boolean;
    protected listeners: ((data: any) => void)[];
    private Notifications;
    private Permissions;
    private Platform;
    constructor(core: Core<{}>, config: NotificationConfig, expoDependencies: ExpoDependencies);
    protected checkPermission(): Promise<boolean>;
    private createChannels;
    protected requestPermission(): Promise<void>;
    private getToken;
    protected updateToken(): Promise<void>;
    addEventListener(cb: (data: any) => void): void;
    protected newNotification(): void;
}
