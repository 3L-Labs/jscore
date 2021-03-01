import { MobileLifecycleDependencies } from "./platforms/Mobile";
import Module from "../Module";
import Core from "../..";
import { PlatformState } from "../../constants/Platform";
import Lifecycle from "./Lifecycle";
interface Config {
    platforms: PlatformState[];
}
declare type DependencyInjection = MobileLifecycleDependencies;
export default class AppManager extends Module {
    private config;
    private dependencyInjection;
    lifecycle: Lifecycle;
    constructor(Core: Core<{}>, config: Config, dependencyInjection: DependencyInjection);
    protected postStart(): Promise<void>;
    protected restart(): Promise<void>;
}
export {};
