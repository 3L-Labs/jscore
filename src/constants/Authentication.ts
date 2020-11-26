import ConstantState from "./ConstantState";
import { action, observable } from "mobx";

export enum AuthenticationState{
  success, 
  emailConfirmation,
  emailConfirmationFailed,
  failed,
  unknown
}

export default class Authentication extends ConstantState {

    @observable public state: AuthenticationState = AuthenticationState.unknown; 

    @action public update(state : AuthenticationState){
      this.state = state;
    }
}