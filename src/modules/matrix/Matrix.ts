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

interface DependencyInjection {}

export default class Matrix extends Module {
    public client;

    constructor(
        core : Core<{}>,
        private config : Config,
        _dependencyInjection: DependencyInjection
    ) {
        super(core);
    }

    async start(){
        this.client = matrixcs.createClient(this.config.home);
    }
}
