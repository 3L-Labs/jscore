import { action, observable } from "mobx";
import Constant from "./Constant";

export enum AuthenticationState{
  SUCCESS, 
  EMAIL_CONFIRMATION,
  EMAIL_CONFIRMATION_FAILED,
  ERROR,
  UNKNOWN
}

export default class Authentication extends Constant<AuthenticationState> {
    @observable public state: AuthenticationState = AuthenticationState.UNKNOWN; 
    @action public update(state : AuthenticationState){
      this.state = state;
    }
}