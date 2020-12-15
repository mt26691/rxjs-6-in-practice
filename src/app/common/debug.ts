import { Observable } from "rxjs";
import { tap } from "rxjs/operators";



export enum LoggingLevel {
    TRACE,
    DEBUG,
    INFO,
    ERROR
}

let rxjsLoggingLevel = LoggingLevel.INFO;

export function setRxJsLoggingLevel(level: LoggingLevel) {
    rxjsLoggingLevel = level;
}
export const debug = (level: LoggingLevel, message: string) => (source: Observable<any>) => source.pipe(tap(val => {
    if (level >= rxjsLoggingLevel) {
        console.log(message + ': ', val);
    }
}));