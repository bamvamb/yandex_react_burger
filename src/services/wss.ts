
export interface ISocketData {
    ws: WebSocket|undefined,
    connected: Promise<void>|undefined
}

export default class WSSClient {
    sockets:{[key:string]: ISocketData } = {}
    routeUrl: string
    constructor(routeUrl: string) {
        this.routeUrl = routeUrl
    }
    initNew = (route:string) => {
        const ws = new window.WebSocket(this.routeUrl + route);
        this.sockets[route] = {
            ws,
            connected: new Promise<void>(resolve => {
                ws.onopen = () => resolve()
            })
        }
        return this.sockets[route]
    }
    addEvents = async (
        route: string, 
        callback: (data:string) => void,
        onclose?: () => void|Promise<void>
    ) => {
        const {ws, connected} = this.sockets[route] ? (
            this.sockets[route]
        ) : (
            this.initNew(route)
        )
        await connected
        if(ws){
            ws.onmessage = (event) =>  callback(event.data)
            if(onclose) {
                ws.onclose = async () => {
                    if(onclose instanceof Promise) await onclose
                    else onclose()
                }
            }
        }
        //TODO:?another events for this?
    }
}