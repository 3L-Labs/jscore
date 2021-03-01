import Module from "../Module";
import Core from "../../Core";
import { ExpoDependencies } from "./platforms/Expo";
interface MobileConfig {
    type: "expo";
    pushTokenEndpoint: string;
}
export interface NotificationConfig {
    version: string;
    platform: "Web" | "Mobile";
    mobile: MobileConfig;
}
export default class Notification extends Module {
    private config;
    private dependencyInjection;
    private notify;
    constructor(core: Core<{}>, config: NotificationConfig, dependencyInjection: ExpoDependencies);
    protected start(): Promise<void>;
    addListener(listener: (data: any) => {}): Promise<void>;
}
export {};
