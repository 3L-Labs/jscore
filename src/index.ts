import Core, { jscore } from "./Core";

import { comm } from "./modules/comm/Comm";
import CSComm from "./modules/comm/slots/client-server";

import Store from "../src/libs/Store";

export { jscore, CSComm, comm, Store }
export default Core;
