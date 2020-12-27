import { slot } from 'ts-event-bus'

export interface Target {
    path: string,
    type: 'object' | 'function'
}

export interface TargetResponse extends Target {
    val: any
}

const CSComm = {
    req: slot<Target, TargetResponse>(),
    res: slot<TargetResponse>()
}

export default CSComm;