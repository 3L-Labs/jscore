export default class Store {
    constructor(Core, children) {
        this.Core = Core;
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
    _() { }
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
//# sourceMappingURL=Store.js.map