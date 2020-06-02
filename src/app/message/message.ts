
export class Message {
    message: string;
    type: MessageType;

    constructor(type: MessageType, message: string) {
        this.type = type;
        this.message = message;
    }
}

export enum MessageType {
    success,
    warning,
    error,
    info
}
