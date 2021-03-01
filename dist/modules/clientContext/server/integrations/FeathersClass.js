var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Feathers from "@feathersjs/feathers";
import io from "socket.io-client";
const socketio = require('@feathersjs/socketio-client');
const rest = require('@feathersjs/rest-client');
import ax from "axios";
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
export default class FeathersClass {
    constructor(opts) {
        this.opts = opts;
        this.client = Feathers();
        this.socket = {};
    }
    setupClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, useSocket } = this.opts;
            const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOjI4LCJzb21la2V5Ijoic29tZXZhbHVlIiwiaWF0IjoxNTY3MjA3MDE5LCJleHAiOjE1Njc4MTE4MTksImF1ZCI6Imh0dHBzOi8va3JpcGEuY29tIiwiaXNzIjoiZmVhdGhlcnMiLCJzdWIiOiJhbm9ueW1vdXMiLCJqdGkiOiI3NTQyNDAxOC01ZTY0LTQ4NmEtODVmMS1lMjU1MDdkYTE3ZGMifQ.B0nnFGOwDmcQ4cl4_ytZ_rEh4BKnmVDEKYRpkQmdWbg";
            if (useSocket) {
                if (!jwt) {
                    return;
                }
                const socket = io.connect(url, {
                    query: {
                        token: "Bearer " + jwt
                    }
                });
                socket.on("connect", () => {
                    console.log("Socket connected.");
                });
                socket.on("connect_timeout", (e) => {
                    console.log("Socket connection timeout : ", e);
                });
                socket.on("connect_error", (e) => {
                    console.log("Socket connect error : ", e);
                });
                socket.on("reconnect_failed", (e) => {
                    console.log("Socket reconnect failed : ", e);
                });
                socket.on("reconnect", (e) => {
                    console.log("Socket reconnected.", e);
                });
                socket.on("reconnect_error", (e) => {
                    console.log("Socket reconnect error : ", e);
                });
                socket.on("disconnect", (reason) => {
                    console.log("Socket disconnected : " + reason);
                    const disconnectString = "Uanble to connected...";
                    switch (reason) {
                        case "io server disconnect":
                            break;
                        case "io client disonnect":
                            break;
                        case "ping timeout":
                            break;
                        default:
                            break;
                    }
                });
                socket.on("error", (e) => {
                    console.log("Connection Error to Server : ", url, e);
                });
                this.client.configure(socketio(socket));
                this.socket = socket;
            }
            else {
                const restClient = rest(url);
                const axios = ax.create({
                    withCredentials: true,
                });
                const interceptor = (config) => {
                    config.headers.Authorization = jwt ? `Bearer ${jwt}` : '';
                    return config;
                };
                axios.interceptors.request.use(interceptor);
                this.client.configure(restClient.axios(axios));
            }
        });
    }
    setup(rawData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { service, method, args: { id, data, params } = {} } = rawData;
            const proxy = this.client.service(service);
            const methodMap = {
                find: () => proxy.find(params),
                get: () => proxy.get(id, params),
                create: () => proxy.create(data, params),
                update: () => proxy.update(id, data, params),
                patch: () => proxy.patch(id, data, params),
                remove: () => proxy.remove(id, params)
            };
            try {
                const res = yield methodMap[method]();
                return res;
            }
            catch (e) {
                console.log("Error : ", e);
            }
        });
    }
    configure(conf) {
        return this.client.configure(conf);
    }
    getClient() {
        return this.client;
    }
    proxyService(service) {
        const proxyService = this.client.service(service);
        return proxyService;
    }
}
//# sourceMappingURL=FeathersClass.js.map