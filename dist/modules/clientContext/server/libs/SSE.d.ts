export declare class SSE {
    private es;
    constructor();
    newSource(sourcePath: string): Promise<unknown>;
    on(...args: any[]): void;
    error(cb: any): void;
    close(): void;
}
