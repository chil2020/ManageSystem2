import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
    getAuth$(): Observable<{}> {
        return of({});
    }
}
