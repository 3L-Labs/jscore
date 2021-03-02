### Structure 

1. jscore
    /modules - 
        appManager
        clientContext
        log
        notification
        matrix
        db

        TODO:
            - Load at build time
            - Clean errors

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
    /osi
        /roots
        /stores
        /login
        /runtime
            /room-matrix
            /metadata-matrix
            /file-container
        /runtime-grid-container

4. apps
    /evntlab
    /chat
        /roots
        /stores
    /photo-share

### Multi-Process Jscore 

- There can be two instances of jscore a parent and child process. 
- Child processes only support the comm and log pacakge
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






