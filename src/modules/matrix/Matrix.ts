import Module from "../Module";
import Core from "../../Core";

const sdk = require("./lib/browser-matrix");
declare var matrixcs;

enum Environments {
    dev = "dev",
    prod = "prod"
}

interface Config {
    home: string;
}

interface DependencyInjection {
}

export default class Matrix extends Module {

    constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
        super(core);
    }

    async start(){
        const client = matrixcs.createClient(this.config.home);
        client.login("m.login.password", {"user": "machine_sinatra", "password": "warmout"}).then((response) => {
            console.log(response.access_token);
        });
    }

    async signIn(username:string , password: string) {

    }

    async createAccount(username:string , password: string) {

    }

    private setup(){
    }
}
