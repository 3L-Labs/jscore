import Module from "../Module";
import Core from "../../Core";
import { createEventBus } from 'ts-event-bus'
import CSComm, { Target } from "./slots";
import { autorun } from "mobx";

interface Config {
}

interface DependencyInjection {

}

const comm = createEventBus({
    events: CSComm,
})

console.log("comm : ", comm);

export { comm, CSComm }


export default class Comm extends Module {

  private disposers: Map<number, () => void> = new Map<number, () => void>();

  constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
    super(core);
  }

  async start(){

    let self = this.Core;

    comm.disconnect.on((id) => {
      const disposer = this.disposers.get(id);

      if (!disposer) {
        return;
      }

      disposer();
    })

    comm.req.on((target: Target) => {
      console.log("Got new target: ", target);
      const { path, type, id} = target;

      //get path from requester
      const observablePathSplit = path.split(".");
      observablePathSplit.shift();

      let obj;
      let prop;

      //find the value
      const val = observablePathSplit.reduce((obs, value) => {
        obj = obs;
        prop = value;
        return obs[value];
      }, self);

      if (type === 'function') {
        const funcRes = val.call(self);
        return {
          id,
          path,
          type,
          val: funcRes
        };
      } 

      this.disposers.set(id, autorun(() => {
        const retObj = {
          id,
          path,
          type,
          val: obj[prop] 
        }

        comm.res(retObj);
      }));

      return {
        id,
        path, 
        type,
        val
      };
    })

  }

}
