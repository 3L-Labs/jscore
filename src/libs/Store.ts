
import Core from "../Core";
import { makeAutoObservable, makeObservable, observable } from "mobx";

export default class Store {

    @observable public isLoading: boolean = false;
    private isRendered : boolean = false;

    private initCallbacks : Array<any> = new Array<any>();
    private foregroundCallbacks : Array<any> = new Array<any>();
    private backgroundCallbacks : Array<any> = new Array<any>();

    //TODO : link in proper types here
    protected http : any;
    protected pubsub : any;

    constructor(protected Core : Core<any>, children? : any[]) {
        if (children)
            children.forEach(c => {
                this[c.name] = new c(Core)
            })

        this.connectionObjects();

        const foreground = () => {
            let self = this;

            return function foreground() {
                if (!self.isRendered) return;
                self.foregroundCallbacks.forEach(cb => cb());
            }
        }

        this.foreground(foreground(), true);

        const background = () => {
            let self = this;

            return function background() {
                if (!self.isRendered) return;
                self.backgroundCallbacks.forEach(cb => cb());
            }
        }

        this.background(background(), true);
    }

    protected createStore(Store, ...args){
        const c = new Store(this.Core, ...args)
        return c;
    }

    protected connectionObjects(){
      ///this.http = this.Core.Modules.ClientContext.home.http;
      //this.pubsub = this.Core.Modules.ClientContext.home.pubsub;
    }

    protected onRender(){
        if (this.isRendered) return;
        this.foregroundCallbacks.forEach(cb => cb());
        this.isRendered = true;
    }

    protected onDeRender(){
        this.isRendered = false;
    }

    protected init(...funcs){
        funcs.forEach(f => {
            //this.Core.Modules.AppManager.lifecycle.addInitCallback(f.bind(this))
            this.initCallbacks.push(f.bind(this));
        })
    }

    protected foreground(...args){
        if (typeof args[args.length-1] !== "boolean") {
            args.push(false);
        }
        const funcs = args.slice(0, args.length-1);
        const global = args[args.length-1]; 

        if (global) {
            //funcs.forEach(f => this.Core.Modules.AppManager.lifecycle.addForegroundCallback(f.bind(this)));
        } else {
            funcs.forEach(f => this.foregroundCallbacks.push(f.bind(this)));
        }

    }

    protected background(...args){
        if (typeof args[args.length-1] !== "boolean") {
            args.push(false);
        }
        const funcs = args.slice(0, args.length-1);
        const global = args[args.length-1]; 

        if (global) {
            //funcs.forEach(f => this.Core.Modules.AppManager.lifecycle.addBackgroundCallback(f.bind(this)));
        } else {
            funcs.forEach(f => this.backgroundCallbacks.push(f.bind(this)));
        }

    }


}