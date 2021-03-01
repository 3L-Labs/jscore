export declare function getEnv(): any;
export declare function useEnv(local: any, prod: any): any;
export declare function usePlatform(): any;
declare let config: {
    name: string;
    child: boolean;
    version: string;
    env: any;
    modules: any;
};
export default config;
