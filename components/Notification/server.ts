
export type NotificationType = 'success' | 'fail' | 'neutral';
export function notifyQuery({ type, message, option }: { type: NotificationType; message: string; option?: { autoClose: boolean; }; }) {
    return new URLSearchParams({ "notify": "true", "notifyType": type.toString(), "message": message, "autoClose": option?.autoClose ? "true" : "false" });

}

