import Constant from "./libs/Constant";
export declare enum AuthenticationState {
    SUCCESS = 0,
    EMAIL_CONFIRMATION = 1,
    EMAIL_CONFIRMATION_FAILED = 2,
    ERROR = 3,
    UNKNOWN = 4
}
export default class Authentication extends Constant<AuthenticationState> {
    state: AuthenticationState;
    update(state: AuthenticationState): void;
}
