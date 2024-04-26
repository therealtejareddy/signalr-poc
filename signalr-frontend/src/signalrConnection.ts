import * as signalR from "@microsoft/signalr";
const URL = "https://localhost:7139/chatHub"; //or whatever your backend port is
class Connector {
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (message: string) => void,
        onUserMessageReceived: (message: string) => void,
        onUserLeftMessageReceived: (message: string) => void
        // onConnected:() => void
    ) => void;
    static instance: Connector;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => document.write(err));
        this.events = (onMessageReceived, onUserMessageReceived, onUserLeftMessageReceived) => {
            this.connection.on("ReceiveMessage", (message) => {
                onMessageReceived(message);
            });
            this.connection.on("SendMessage", (message) => {
                onUserMessageReceived(message)
            })
            this.connection.on("UserLeft",(message) => {
                onUserLeftMessageReceived(message)
            })
        };
    }
    public newMessage = (user: string, messages: string) => {
        this.connection.send("SendMessage", user, messages).then(x => console.log("sent"))
    }
    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}

export default Connector.getInstance;