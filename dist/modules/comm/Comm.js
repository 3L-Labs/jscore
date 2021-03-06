var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Module from "../Module";
import { createEventBus } from 'ts-event-bus';
import CSComm from "./slots/client-server";
import ClientServerInit from "./setup/client-server";
export var Channels;
(function (Channels) {
    Channels[Channels["CLIENT_SERVER"] = 0] = "CLIENT_SERVER";
})(Channels || (Channels = {}));
let comm;
export { comm, CSComm };
export default class Comm extends Module {
    constructor(core, config, dependencyInjection) {
        super(core);
        this.config = config;
        this.dependencyInjection = dependencyInjection;
        this.disposers = new Map();
        comm = createEventBus({
            events: CSComm
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.client_server) {
                ClientServerInit(this.core, comm);
            }
        });
    }
}
//# sourceMappingURL=Comm.js.map