import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    messages: string[] = [];

    add(message: string): any {
        this.messages.push(message);
    }

    clear(): any {
        this.messages = [];
    }
    constructor() {}
}
