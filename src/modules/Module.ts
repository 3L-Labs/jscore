import Core from "..";

interface Dependencies {
  package : string,
  version : string
}

export interface ModuleConfig {
  version : string,
  dependencies : Dependencies
}

export default class Module {
  constructor(protected Core: Core<{}>) {}
  static async init(Core: Core<{}>, name, config, dependencies) {
    const ModuleClass = this;
    Core.Modules[name] = new (ModuleClass as any)(Core, config, dependencies);
  }
  protected async start() {}
  protected async postStart() {}
  protected async restart() {}
  protected async stop() {}
}
