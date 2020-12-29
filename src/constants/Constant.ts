export default abstract class Constant<T>{
    abstract state : T;
    abstract update(state : T): void;
}