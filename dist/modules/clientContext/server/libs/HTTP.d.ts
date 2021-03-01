import { ServerConfig } from "../../ClientContext";
export default class HTTP {
    private config;
    private authorizaionHeader;
    private ax;
    constructor(config: ServerConfig, authorizaionHeader: string);
    setup(): void;
    get(...args: any[]): Promise<any>;
    post(...args: any[]): any;
}
