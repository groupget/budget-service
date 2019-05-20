export enum ExchangeType {
    Topic = "topic",
    Fanout = "fanout",
    Direct = "direct"
}

export type NotificationEventType = "created" | "updated" | "deleted" | "item-checked" | "item-unchecked";
export type NotificationEventResourceType = "item" | "list" | "expense";

export class NotificationEvent {
    type: NotificationEventType;
    resourceType: NotificationEventResourceType;
    message: any;
}
