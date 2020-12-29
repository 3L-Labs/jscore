### Structure 

1. jscore
    /modules - Load at build time
        appManager
        clientContext
        log
        notification
        matrix
        db
    /constants
        Authentication
        AppConfig
        Connection
        Platform
    /libs
        Dictionary
        Store
    /stores
        *Added at runtime 
2. osi-builds
    /config
        App.config
        Module.config
    /react
    /react-native
    /electron
    /extension
3. dictionary
    /storybook
    /storybook-rn
    /roots
        /osi
    /login
    /runtime
        /evntlab-specification
        /room-matrix
        /metadata-matrix
        /file-container
        /bridge
    /runtime-grid-container
4. apps
    /evntlab
    /chat
    /photo-share

### Multi-Process Mobx 

- Mobx + ts-event-bus

- Mobx is a dependency graph, where the core state is the root nodes and the leafs are the end reaction. It goes through a derivation algorithm to figure out 
when a computation or reaction needs to be alerted
- The goal is to be able to have a reaction occur on another process 
- To factiliate that communication, using ts-event-bus which allows for typed distributed messaging 

todo: - 

- What happends when a react functional component is wrapped with observer()


### Multi-Process Jscore 

- There can be two instances of jscore a parent and child process. 
- Child processes don't support stores or constants. 
- Child processes need an open line of communication with its parent

## OSI Binary

```
{
    runtime : {
        version: 1.0.0
    },
    stdlib : {
        version: 0.3.0
    },
    children : {
        root: {
            name: Evntlab
            roomId: 0x213ab32
            content_location: 0x23oas34lj
        },
        other : [
            {
                name: Chat
                roomId: 0x213ab32
                content_location: 0x23oas34lj
            },
            {
                name: Chat
                roomId: 0x213ab32
                content_location: 0x23oas34lj
            },
        ]
    },
}
```


## Matrix 


## Jscore






