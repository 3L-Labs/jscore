import SpringBoot from './server/integrations/SpringBoot';
import { SocketOptions } from './server/libs/Socket';
import Cognito, { AmazonCognitoInjection } from './auth/integrations/Cognito';
import Core from '../../Core';
import Module, { ModuleConfig } from '../Module';
export declare enum AuthType {
    Chain = "Chain",
    Cognito = "Cognito",
    OAuth = "OAuth",
    None = "None"
}
export declare enum ServerType {
    Feathers = "Feathers",
    SpringBoot = "SpringBoot"
}
export declare enum CommunicationTypes {
    http = "http",
    sse = "sse",
    socket = "socket"
}
export interface ServerConfig {
    type: ServerType;
    home?: boolean;
    name: string;
    communicationTypes: CommunicationTypes[];
    socket: SocketOptions;
    path: string;
    apiVersion: string;
}
interface AuthConfig {
    type: AuthType;
    config: any;
}
interface Config extends ModuleConfig {
    server: ServerConfig[];
    auth: AuthConfig;
}
interface DependencyInjection {
    AmazonCognito: AmazonCognitoInjection;
}
export default class ClientContext extends Module {
    private config;
    private dependencyInjection;
    auth: Cognito | undefined;
    home: SpringBoot;
    constructor(core: Core<{}>, config: Config, dependencyInjection: DependencyInjection);
    protected start(): Promise<void>;
    private checkAuth;
    logout(): Promise<void>;
    private setupHomeConnection;
}
export {};
