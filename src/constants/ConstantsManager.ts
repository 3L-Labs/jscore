import Authentication from "./Authentication";
import Connection from "./Connection";
import Platform from "./Platform";

export default class ConstantsManager { 
    public Authentication: Authentication = new Authentication();
    public Connection: Connection = new Connection();
    public Platform: Platform = new Platform();
}