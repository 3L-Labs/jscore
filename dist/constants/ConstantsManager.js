import Authentication from "./Authentication";
import Connection from "./Connection";
import Platform from "./Platform";
export default class ConstantsManager {
    constructor() {
        this.authentication = new Authentication();
        this.connection = new Connection();
        this.platform = new Platform();
    }
}
//# sourceMappingURL=ConstantsManager.js.map