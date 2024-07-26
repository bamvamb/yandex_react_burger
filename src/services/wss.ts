
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
    initNew = (route:string, accessToken?:string) => {
        const wssurl = this.routeUrl + route + (accessToken ? `?token=${accessToken}` : "")
        const ws = new window.WebSocket(wssurl);
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
        onmessage: (data:string) => void,
        onclose?: () => void|Promise<void>,
        accessToken?:string
    ) => {
        const {ws, connected} = this.sockets[route] ? (
            this.sockets[route]
        ) : (
            this.initNew(route, accessToken)
        )
        await connected
        if(ws){
            ws.onmessage = (event) => onmessage(event.data)
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