import { Injectable } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Keepalive } from '@ng-idle/keepalive';
import { constant } from '@modules/constant';
@Injectable({
  providedIn: 'root'
})
export class IdleTimeoutService {
    public userTimeout = new BehaviorSubject<boolean>(false);
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = undefined;
    constructor( private idle: Idle, private keepalive: Keepalive) {
      // this.userLoggedIn.next(false);
    }

    private hasToken(): boolean {
      if ( localStorage.getItem(constant.localstorage_login) === 'false') {
        return false;
      } else {
        return true;
      }
    }
    setUserTimeout(userLoggedIn: boolean) {
      this.userTimeout.next(userLoggedIn);

    }

    getUserTimeout(): Observable<boolean> {
      return this.userTimeout.asObservable();
    }


    start() {
        this.idle.onTimeoutWarning.observers.length = 0;
        this.idle.onTimeout.observers.length = 0;
        this.idle.onIdleStart.observers.length = 0;
        this.idle.onIdleEnd.observers.length = 0;
        this.setUserTimeout(false);
        this.idle.setIdle(10);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        this.idle.setTimeout(600);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        console.log('idle start ' );

        this.idle.onIdleEnd.subscribe(() => {
          this.idleState = 'No longer idle.';
          console.log(this.idleState);
          this.reset();
        });

        this.idle.onTimeout.subscribe(() => {
          this.idleState = 'Timed out!';
          this.timedOut = true;
          this.idle.stop();
          console.log(this.idleState);
          this.setUserTimeout(true);
        });

        this.idle.onIdleStart.subscribe(() => {
            this.idleState = 'You\'ve gone idle!';
            console.log(this.idleState);

        });

        this.idle.onTimeoutWarning.subscribe((countdown: any) => {
          this.idleState = 'You will time out in ' + countdown + ' seconds!';
          if ( countdown % 60 === 0 ) {
            console.log(this.idleState);
          }

        });

        // sets the ping interval to 15 seconds
        this.keepalive.interval(15);

        this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

        if ( this.hasToken() ) {
          this.idle.watch();
          this.timedOut = false;
        } else {
          this.idle.stop();
        }

    }

    reset() {
      this.setUserTimeout(false);
      this.idle.watch();
      // xthis.idleState = 'Started.';
      this.timedOut = false;
    }

    stop() {
      this.setUserTimeout(false);
      this.idle.stop();
    }
}
