var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable } from "mobx";
export default class Store {
    constructor(core, children) {
        this.core = core;
        this.isLoading = false;
        this.isRendered = false;
        this.initCallbacks = new Array();
        this.foregroundCallbacks = new Array();
        this.backgroundCallbacks = new Array();
        if (children)
            children.forEach(c => {
                this[c.name] = new c(core);
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
        const c = new Store(this.core, ...args);
        return c;
    }
    connectionObjects() {
        var _a, _b, _c, _d;
        try {
            if (!this.core.modules.clientContext ||
                !this.core.modules.clientContext.home) {
                return;
            }
            this.http = (_b = (_a = this.core.modules) === null || _a === void 0 ? void 0 : _a.clientContext) === null || _b === void 0 ? void 0 : _b.home.http;
            this.pubsub = (_d = (_c = this.core.modules) === null || _c === void 0 ? void 0 : _c.clientContext) === null || _d === void 0 ? void 0 : _d.home.pubsub;
        }
        catch (e) {
            console.warn("Failed creating connection objects");
        }
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
            var _a;
            if (this.core.modules.appManager) {
                (_a = this.core.modules) === null || _a === void 0 ? void 0 : _a.appManager.lifecycle.addInitCallback(f.bind(this));
            }
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
            funcs.forEach(f => {
                if (this.core.modules.appManager) {
                    this.core.modules.appManager.lifecycle.addForegroundCallback(f.bind(this));
                }
            });
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
            funcs.forEach(f => {
                if (this.core.modules.appManager) {
                    this.core.modules.appManager.lifecycle.addBackgroundCallback(f.bind(this));
                }
            });
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