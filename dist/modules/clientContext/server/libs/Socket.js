var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var SOCKET;
(function (SOCKET) {
    SOCKET["CONNECT"] = "CONNECT";
    SOCKET["RECONNECT"] = "RECONNECT";
    SOCKET["RECONNECT_FAILURE"] = "RECONNECT_FAILURE";
    SOCKET["SERVER_DISCONNECT"] = "SERVER_DISCONNECT";
    SOCKET["CLIENT_DISCONNECT"] = "CLIENT_DISCONNECT";
    SOCKET["PING_TIMEOUT"] = "PING_TIMEOUT ";
    SOCKET["ERROR"] = "ERROR ";
    SOCKET["CONNECT_ERROR"] = "CONNECT_ERROR ";
})(SOCKET || (SOCKET = {}));
export default class Socket {
    constructor(opts, token) {
        this.opts = opts;
        this.token = token;
        this.header = { 'X-Authorization': 'bearer ' + token };
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onMessage(event, cb) {
        if (!this.sock) {
            return () => { };
        }
        const listenerFunction = (incomingData) => {
            cb(JSON.parse(incomingData.body));
        };
        const sub = this.sock.subscribe(event, listenerFunction);
        return sub.unsubscribe;
    }
    send(path, data) {
        if (!this.sock) {
            return;
        }
        this.sock.publish({
            destination: this.opts.config.apiVersion + path,
            body: typeof data === 'string' ? data : JSON.stringify(data)
        });
    }
}
//# sourceMappingURL=Socket.js.map