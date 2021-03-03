var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class SSE {
    constructor() { }
    newSource(sourcePath) {
        return __awaiter(this, void 0, void 0, function* () {
            this.es = new EventSource(sourcePath);
            return new Promise((resolve, reject) => {
                this.es.onmessage = (opened) => {
                    resolve(opened);
                };
                this.es.onerror = (error) => {
                    reject(error);
                };
            });
        });
    }
    on(...args) {
        if (args.length === 1) {
            this.es.onmessage = (message) => {
                args[0](message);
            };
        }
        else {
            this.es.addEventListener(args[0], args[1]);
        }
    }
    error(cb) {
        this.es.onerror(cb);
    }
    close() {
        this.es.close();
    }
}
//# sourceMappingURL=SSE.js.map