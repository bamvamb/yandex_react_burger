
export interface ISocketData {
    ws: WebSocket,
    connection: Promise<void>
    connected?: boolean
}

interface WebSocketError extends Event {
    code: number;
    reason: string;
}

interface WebSocketActionsHandlers {
    onmessage: (serialized_data:string) => void|Promise<void>,
    onopen?: () => void|Promise<void>,
    onclose?: () => void|Promise<void>,
    onerror?: (err:{code:number, reason:string}) => void|Promise<void>
}

export default class WSSClient {
    sockets:{[key:string]: ISocketData } = {}
    routeUrl: string
    constructor(routeUrl: string) {
        this.routeUrl = routeUrl
    }
    initNew = async (route:string, accessToken?:string, onOpen?: () => void|Promise<void>) => {
        const wssurl = this.routeUrl + route + (accessToken ? `?token=${accessToken}` : "")
        const ws = new window.WebSocket(wssurl);
        this.sockets[route] = {
            ws,
            connection: new Promise<void>(resolve => {
                ws.onopen = async () => { 
                    if(onOpen){
                        const fnres = onOpen()
                        if(onclose instanceof Promise) await fnres
                    }
                    this.sockets[route].connected = true
                    resolve()
                }
            })
        }
        return this.sockets[route]
    }
    getOrCreateSocket = async (route: string, accessToken?: string, onOpen?:  WebSocketActionsHandlers['onopen']) => {
        return this.sockets[route] ? this.sockets[route] : await this.initNew(route, accessToken, onOpen)
    }

    addEvents = async (
        route: string,
        eventsHandlers: WebSocketActionsHandlers,
        accessToken?:string
    ) => {
        const {onmessage, onclose, onopen, onerror} = eventsHandlers
        const socket = await this.getOrCreateSocket(route, accessToken, onopen)
        const {ws, connection} = socket
        if(ws){
            if(onmessage){
                ws.onmessage = async (event) => {
                    const fnres = onmessage(event.data)
                    if(onclose instanceof Promise) await fnres
                }
            }
            
            ws.onclose = async () => {
                if(onclose){
                    const fnres = onclose()
                    if(onclose instanceof Promise) await fnres
                    delete this.sockets[route]
                }
            }

            if(onerror){
                ws.onerror = async (event) => {
                    const err = event as WebSocketError
                    const fnres = onerror(err)
                    if(onerror instanceof Promise) await fnres
                }
            }
        }
        await connection
    }

    disconnect = (route:string) => {
        const socket = this.sockets[route];
        if(socket && socket.connected){
            socket.ws.close()
        }
    }

    send = async (data: object, route:string, accessToken?:string) => {
        const {ws} = await this.getOrCreateSocket(route, accessToken)
        ws.send(JSON.stringify(data))
    }
}