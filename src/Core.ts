
import { reaction, observable, action, getObserverTree } from "mobx";
import mitt from "mitt";

/**
 * Modules 
 */
import MapConfig from "./modules/Map.config";
import Module from "./modules/Module";
import ModuleManager from "./modules/ModuleManager";

/**
 * Constants
 */
import ConstantsManager from "./constants/ConstantsManager";
import { AppConfig } from "./constants/AppConfig";
import { AuthenticationState } from "./constants/Authentication";
import { makeAutoObservable } from "mobx";

export let CoreConstants: ConstantsManager;
export let CoreEmit: any = (mitt as any)();

export default class Core<T={}> { 

    public Constants: ConstantsManager;
    public Modules: ModuleManager = {};
    public Stores: T = {} as T;

    private delayedInit : any = [];
    private started: boolean = false;

    @observable public testValue : number = 2;
    @observable public testValue1 : number = 3;

    constructor(private config : AppConfig) {
      makeAutoObservable(this);

      this.Constants = new ConstantsManager();
      CoreConstants = this.Constants
      this.addConstantListeners();

      console.log("# jscore config : ", config);
      //getObserverTree(() => this)

    }

    @action
    public incrementTestValue(){
      this.testValue++;
    }

    /*************************
     * Jscore Constant Watchers
     *************************/

    private addConstantListeners(){
      this.onAuthChanged();
    }

    private async onAuthChanged(){
      reaction(
        () => this.Constants.authentication.state,
        async (arg: AuthenticationState) => {
          if (!this.started){
            return; 
          }

          if (arg === AuthenticationState.success) {
            await (this.Modules.ClientContext as any).start();
            await this.resetStores();
            (this.Modules.AppManager?.lifecycle as any).initCallbacks.forEach(i => i());

          }
        }
      )
    } 

    /*************************
     * Module Lifecycle Methods 
     *************************/

    /**
     * Initializes and starts the modules requested by the client. 
     * Then,
     * Instatiates and creates the client stores.
     *  
     * @param dependencyInjection 
     */
    public async start(dependencyInjection? : any): Promise<Core<T>> {

      //default in case its loaded with require
      const requestedModules = this.config.modules;

      //Check our dependencies across our modules
      try { 
        const missingModuleDepdendencies = (modules) => {
          return Array.from(Object.keys(modules)).find(moduleName => {
            const dependencies = modules[moduleName].dependencies;
            if (!dependencies)
              return false;

            return !!dependencies.find((dependency) => {
              if (!modules[dependency.package])
                return true
              else {
                if (modules[dependency.package].version !== dependency.version) 
                  return true
                return false
              }
            })
          })
        }

        if (missingModuleDepdendencies(requestedModules))
          throw new Error("Bad Module Configuration! Missing dependencies");


        //load and start all of our modules
        const loadedModules: Array<Promise<void>> = [];
        const errors: Array<any> = []
        Array.from(Object.keys(requestedModules)).forEach((moduleName) => {

          //Get the module from the map
          const moduleConfig = requestedModules[moduleName];
          const Module = MapConfig[moduleName];

          //grab any injected dependencies
          let dependencies;
          if (dependencyInjection) {
            dependencies = dependencyInjection[moduleName];
          }
          
          //Initialize the module and add to core
          Module.init(this, moduleName, moduleConfig, dependencies);
   
          //Start the Module, the module name is camelCased
            loadedModules.push((async () => {
              try {
                await this.Modules[moduleName].start()
                console.log(`# ${moduleName} : started`)
              } catch (e) {
                errors.push({
                  type : "critical",
                })
                console.log(`%# ${moduleName} : failed to start`, "color:red", e);
              }
            })());
        })

        await Promise.all(loadedModules);

        await this.startStores();
        await this.startLibs();

        //Run callbacks for anyone who is waiting for everything to start up.
        await this.postStart();
        this.delayedInit.forEach((func : any) => func())

        console.log("# jscore : successfully started")
        this.started = true;
      } catch (e) {
          throw e;
      }

      return this;
    }

    /**
     * Called after all modules started and stores instantiated.
     */
    private async postStart(){
      return Promise.all(this.modules.map(m => {
        if((m as any).postStart)
          (m as any).postStart()
      }));
    }

    public async reset(){
      return Promise.all(this.modules.map(m => (m as any).restart()));
    }

    /*************************
     * Module Helper Methods
     *************************/

    /**
     * Returns current modules on the core.
     */
    private get modules(){
      return Array.from(Object.keys(this.config.modules)).map((moduleName) => {
        return (this.Modules[moduleName] as Module);
      })
    }

    /*************************
     * Store Lifecycle Methods 
     *************************/

    private async startStores(){
      if (this.config.child) {
        throw new Error("Jscore children should not contain stores!");
      }
      //start our stores or any injected class (classes that are using the @jscore)
      (Core as any).storeInjections.forEach((inject : any) => {
          if (inject.name) {
              this.Stores[inject.name] = new inject.constructor(this)
              this.Stores[inject.name]._();
          } else {
              this.Stores[inject.constructor.name] = new inject.constructor(this);
            this.Stores[inject.constructor.name]._();
          }
      })
    }

    private async resetStores(){
      (Core as any).storeInjections.forEach((inject : any) => {
        this.Stores[inject.constructor.name]._();
      })
    }

    /*************************
     * Lib Lifecycle Methods 
     *************************/

    private async startLibs(){
      //start our stores or any injected class (classes that are using the @jscore)
      (Core as any).libInjections.forEach((inject : any) => {
          if (inject.name) {
              this.Stores[inject.name] = new inject.constructor(this)
          } else {
              this.Stores[inject.constructor.name] = new inject.constructor(this);
          }
      })
    }

    private async resetLibs() {
      this.startStores();
    }

}

/**
 * @jscore decorator functionality 
 */
(Core as any).storeInjections = [];
(Core as any).libInjections = [];
export const jscore = {
  store : function (name : string){
    return (constructor) => {
        (Core as any).storeInjections.push({
            constructor : constructor,
            name : name
        })
    }
  },
  lib : function (name : string){
    return (constructor) => {
        (Core as any).libInjections.push({
            constructor : constructor,
            name : name
        })
    }
  },
}
