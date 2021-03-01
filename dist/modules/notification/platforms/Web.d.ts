import NotificationClass from "../AbstractNotification";
import Core from "../../../Core";
import { NotificationConfig } from "../Notification";
export declare enum WebDependencies {
    window = 0
}
interface NotificationData {
    title: string;
    text: string;
}
export default class WebNotification extends NotificationClass {
    private core;
    private config;
    hasPermission: boolean;
    listeners: ((data: any) => void)[];
    constructor(core: Core<{}>, config: NotificationConfig);
    protected checkPermission(): Promise<boolean>;
    protected requestPermission(): Promise<void>;
    addEventListener(cb: (data: any) => void): void;
    protected updateToken(): void;
    newNotification(data: NotificationData): void;
}
export {};
