import Server from "../Server";
import HTTP from "../libs/HTTP";
import { ServerConfig } from "../../ClientContext";
import PubSub from "../libs/PubSub";
export interface SpringBootOpts {
    config: ServerConfig;
    idToken: string;
    accessToken: string;
}
export interface Tokens {
    idToken: string;
    accessToken: string;
}
export default class SpringBoot extends Server {
    private opts;
    private tokens;
    http: HTTP;
    pubsub: PubSub;
    constructor(opts: SpringBootOpts);
    setup(): Promise<void>;
    protected sanityCheck(): Promise<void>;
}
