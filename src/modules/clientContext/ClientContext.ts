import SpringBoot from './server/integrations/SpringBoot';
import { SocketOptions } from './server/libs/Socket';

import Cognito, { AmazonCognitoInjection } from './auth/integrations/Cognito';

import Core from '../../Core';
import Module, { ModuleConfig } from '../Module';
import { AuthenticationState } from '../../constants/Authentication';

export enum AuthType { 
  Chain = "Chain", 
  Cognito = "Cognito",
  OAuth = "OAuth",
  None = "None"
}

export enum ServerType { 
  Feathers  = "Feathers",
  SpringBoot = "SpringBoot"
}

export enum CommunicationTypes { 
  http = "http",
  sse = "sse",
  socket = "socket"
}

export interface ServerConfig { 
  type : ServerType, 
  home? : boolean,
  name : string,
  communicationTypes : CommunicationTypes[],
  socket : SocketOptions,
  path : string,
  apiVersion : string 
}

interface AuthConfig { 
  type : AuthType,
  config : any
}

interface Config extends ModuleConfig { 
  server : ServerConfig[],
  auth : AuthConfig
}


interface DependencyInjection {
  AmazonCognito: AmazonCognitoInjection
}

export default class ClientContext extends Module {

  public auth : Cognito | undefined;
  public home : SpringBoot;

  constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
    super(core);
  }

  protected async start() {
    try {
      await this.checkAuth();
      await this.setupHomeConnection();
    } catch (e) {
      await this.setupHomeConnection();
      throw e;
    }
  }

  private async checkAuth() {

    switch (this.config.auth.type) {
      case AuthType.Chain :
        console.log("ClientContext : Using chain for authentication.");
        break;

      case AuthType.Cognito :
        this.auth = new Cognito(this.Core.Constants.authentication.update.bind(this.Core.Constants.authentication), this.config.auth.config, this.dependencyInjection.AmazonCognito);
        await (this.auth as any).checkLocalAuth();
        break;

      case AuthType.None : 
        this.Core.Constants.authentication.update(AuthenticationState.success)
        break;
    }

  }

  async logout() {
      this.auth?.signOut();
      this.auth = undefined;
      this.Core.Constants.authentication.update(AuthenticationState.failed);
      this.start();
  }

  /**
   * Depending on our server type, connect and create the inital connections if needed (socket)
   */
  private async setupHomeConnection() {

    let home : ServerConfig | undefined = this.config.server.find(config => config.home);

    if (!home) {
        return;
    }
    
    if (home.type === ServerType.Feathers) {

      //Feathers support depecrated for now

      /*
      this.home = new FeathersClass({
        url : home.path,
        useSocket : false
      });

      await this.home.setupClient();*/

    } else if (home.type === ServerType.SpringBoot) {

      this.home = new SpringBoot({
        config : home,
        accessToken : (this.auth as any).accessToken,
        idToken : (this.auth as any).idToken
      })

      await (this.home as any).setup();
    }
  }
}  


