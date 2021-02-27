
import MobileLifecycle, { MobileLifecycleDependencies } from "./platforms/Mobile";
import WebLifecycle from "./platforms/Web";
import Module from "../Module";
import Core from "../..";
import { PlatformState } from "../../constants/Platform";
import Lifecycle from "./Lifecycle";

interface Config {
  platforms : PlatformState[]
}

type DependencyInjection = MobileLifecycleDependencies;

export default class AppManager extends Module {

    public lifecycle : Lifecycle;

    constructor(Core : Core<{}>, private config : Config, private dependencyInjection : DependencyInjection){
      super(Core);

      if (this.Core.Constants.Platform.state === PlatformState.Mobile) {
          this.lifecycle = new MobileLifecycle(dependencyInjection);
      } else if (this.Core.Constants.Platform.state === PlatformState.Web) {
          this.lifecycle = new WebLifecycle();
      }

    }

    protected async postStart(){
      (this.lifecycle as any).start();
    }

    protected async restart() {}
}