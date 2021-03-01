import Authentication from "./Authentication";
import Connection from "./Connection";
import Platform from "./Platform";
export default class ConstantsManager {
    constructor() {
        this.Authentication = new Authentication();
        this.Connection = new Connection();
        this.Platform = new Platform();
    }
}
//# sourceMappingURL=ConstantsManager.js.map