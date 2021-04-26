var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { reaction, observable, makeAutoObservable } from "mobx";
import MapConfig from "./modules/Map.config";
const x = "new";
import ConstantsManager from "./constants/ConstantsManager";
import { AuthenticationState } from "./constants/Authentication";
export let coreConstants;
let mainCore;
let _ = {
    m() {
        return mainCore;
    }
};
export { _ };
export default class Core {
    constructor(config) {
        this.config = config;
        this.modules = {};
        this.stores = {};
        this.libs = {};
        this.delayedInit = [];
        this.started = false;
        mainCore = this;
        makeAutoObservable(this);
        this.constants = new ConstantsManager();
        coreConstants = this.constants;
        this.addConstantListeners();
        console.log("# jscore config : ", config);
    }
    addConstantListeners() {
        this.onAuthChanged();
    }
    onAuthChanged() {
        return __awaiter(this, void 0, void 0, function* () {
            reaction(() => this.constants.authentication.state, (arg) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (!this.started) {
                    return;
                }
                if (arg === AuthenticationState.SUCCESS) {
                    yield this.modules.clientContext.start();
                    yield this.resetStores();
                    ((_a = this.modules.appManager) === null || _a === void 0 ? void 0 : _a.lifecycle).initCallbacks.forEach(i => i());
                }
            }));
        });
    }
    start(dependencyInjection) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestedModules = this.config.modules;
            try {
                const missingModuleDepdendencies = (modules) => {
                    return Array.from(Object.keys(modules)).find(moduleName => {
                        const dependencies = modules[moduleName].dependencies;
                        if (!dependencies)
                            return false;
                        return !!dependencies.find((dependency) => {
                            if (!modules[dependency.package])
                                return true;
                            else {
                                if (modules[dependency.package].version !== dependency.version)
                                    return true;
                                return false;
                            }
                        });
                    });
                };
                if (missingModuleDepdendencies(requestedModules))
                    throw new Error("Bad Module Configuration! Missing dependencies");
                const loadedModules = [];
                const errors = [];
                Array.from(Object.keys(requestedModules)).forEach((moduleName) => {
                    const moduleConfig = requestedModules[moduleName];
                    const Module = MapConfig[moduleName];
                    let dependencies;
                    if (dependencyInjection) {
                        dependencies = dependencyInjection[moduleName];
                    }
                    Module.init(this, moduleName, moduleConfig, dependencies);
                    loadedModules.push((() => __awaiter(this, void 0, void 0, function* () {
                        try {
                            yield this.modules[moduleName].start();
                            console.log(`# ${moduleName} : started`);
                        }
                        catch (e) {
                            errors.push({
                                type: "critical",
                            });
                            console.log(`# ${moduleName} : failed to start`, "color:red", e);
                        }
                    }))());
                });
                yield Promise.all(loadedModules);
                yield this.startStores();
                yield this.startLibs();
                yield this.postStart();
                this.delayedInit.forEach((func) => func());
                console.log("# jscore : successfully started");
                this.started = true;
            }
            catch (e) {
                throw e;
            }
            return this;
        });
    }
    postStart() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(this.liveModules.map(m => {
                if (m.postStart)
                    m.postStart();
            }));
        });
    }
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(this.liveModules.map(m => m.restart()));
        });
    }
    get liveModules() {
        return Array.from(Object.keys(this.config.modules)).map((moduleName) => {
            return this.modules[moduleName];
        });
    }
    startStores() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.child) {
                throw new Error("Jscore children should not contain stores!");
            }
            const stores = {};
            Core.storeInjections.forEach((inject) => {
                if (inject.name) {
                    this.stores[inject.name] = new inject.constructor(this);
                    this.stores[inject.name]._();
                }
                else {
                    this.stores[inject.constructor.name] = new inject.constructor(this);
                    this.stores[inject.constructor.name]._();
                }
            });
        });
    }
    resetStores() {
        return __awaiter(this, void 0, void 0, function* () {
            Core.storeInjections.forEach((inject) => {
                if (!inject) {
                    return;
                }
                this.stores[inject.constructor.name.toLowerCase()]._();
            });
        });
    }
    startLibs() {
        return __awaiter(this, void 0, void 0, function* () {
            Core.libInjections.forEach((inject) => {
                if (inject.name) {
                    this.libs[inject.name] = new inject.constructor(this);
                }
                else {
                    this.libs[inject.constructor.name] = new inject.constructor(this);
                }
            });
        });
    }
    resetLibs() {
        return __awaiter(this, void 0, void 0, function* () {
            this.startStores();
        });
    }
}
__decorate([
    observable
], Core.prototype, "constants", void 0);
__decorate([
    observable
], Core.prototype, "modules", void 0);
__decorate([
    observable
], Core.prototype, "stores", void 0);
Core.storeInjections = [];
Core.libInjections = [];
const jscore = {
    store: function (name) {
        return (constructor) => {
            Core.storeInjections.push({
                constructor: constructor,
                name: name
            });
        };
    },
    lib: function (name) {
        return (constructor) => {
            Core.libInjections.push({
                constructor: constructor,
                name: name
            });
        };
    },
};
globalThis.jscore = jscore;
export { jscore };
//# sourceMappingURL=Core.js.map