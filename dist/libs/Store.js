var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable } from "mobx";
export default class Store {
    constructor(Core, children) {
        this.Core = Core;
        this.isLoading = false;
        this.isRendered = false;
        this.initCallbacks = new Array();
        this.foregroundCallbacks = new Array();
        this.backgroundCallbacks = new Array();
        if (children)
            children.forEach(c => {
                this[c.name] = new c(Core);
            });
        this.connectionObjects();
        const foreground = () => {
            let self = this;
            return function foreground() {
                if (!self.isRendered)
                    return;
                self.foregroundCallbacks.forEach(cb => cb());
            };
        };
        this.foreground(foreground(), true);
        const background = () => {
            let self = this;
            return function background() {
                if (!self.isRendered)
                    return;
                self.backgroundCallbacks.forEach(cb => cb());
            };
        };
        this.background(background(), true);
    }
    createStore(Store, ...args) {
        const c = new Store(this.Core, ...args);
        return c;
    }
    connectionObjects() {
    }
    onRender() {
        if (this.isRendered)
            return;
        this.foregroundCallbacks.forEach(cb => cb());
        this.isRendered = true;
    }
    onDeRender() {
        this.isRendered = false;
    }
    init(...funcs) {
        funcs.forEach(f => {
            this.initCallbacks.push(f.bind(this));
        });
    }
    foreground(...args) {
        if (typeof args[args.length - 1] !== "boolean") {
            args.push(false);
        }
        const funcs = args.slice(0, args.length - 1);
        const global = args[args.length - 1];
        if (global) {
        }
        else {
            funcs.forEach(f => this.foregroundCallbacks.push(f.bind(this)));
        }
    }
    background(...args) {
        if (typeof args[args.length - 1] !== "boolean") {
            args.push(false);
        }
        const funcs = args.slice(0, args.length - 1);
        const global = args[args.length - 1];
        if (global) {
        }
        else {
            funcs.forEach(f => this.backgroundCallbacks.push(f.bind(this)));
        }
    }
}
__decorate([
    observable
], Store.prototype, "isLoading", void 0);
//# sourceMappingURL=Store.js.map