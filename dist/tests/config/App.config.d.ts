export declare function getEnv(): any;
export declare function useEnv(local: any, prod: any): any;
export declare function usePlatform(): any;
declare let config: {
    name: string;
    version: string;
    child: boolean;
    env: any;
    modules: any;
};
export default config;
