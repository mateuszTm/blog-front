export class Message {
    constructor(
        public type: MessageType,
        public message: string
    ) { }

}

export enum MessageType {
    success,
    warning,
    error,
    info
}
