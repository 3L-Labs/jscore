var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SSE } from "./SSE";
export var PubSubTypes;
(function (PubSubTypes) {
    PubSubTypes[PubSubTypes["SSE"] = 0] = "SSE";
    PubSubTypes[PubSubTypes["Socket"] = 1] = "Socket";
})(PubSubTypes || (PubSubTypes = {}));
const MAX_SSE_CONNECTIONS = 6;
export default class PubSub {
    constructor() {
        this.numberOfSSEConnections = 0;
    }
    newPubsub(type, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === PubSubTypes.SSE) {
                this.sse = obj;
            }
            else {
                this.socket = obj;
                yield this.socket.setup();
            }
        });
    }
    newEventSource(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.numberOfSSEConnections === MAX_SSE_CONNECTIONS) {
                throw new Error("Max number of sse connections being used!");
            }
            if (!path) {
                throw new Error("Path not provided");
                return;
            }
            let es = new SSE();
            yield es.newSource(path);
            this.numberOfSSEConnections++;
            return es;
        });
    }
    on(event, cb) {
        if (!this.socket) {
            console.error("Sockets are not setup!");
            return () => { };
        }
        return this.socket.onMessage(event, cb);
    }
    send(event, data) {
        if (!this.socket) {
            throw new Error("Sockets are not setup!");
        }
        this.socket.send(event, data);
    }
}
//# sourceMappingURL=PubSub.js.map