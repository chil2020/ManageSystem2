import { IdleTimeoutService } from './idle-timeout/idle-timeout.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChildActivationEnd, Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { constant } from '@modules/constant';
import { DialogComponent } from '@modules/utility/components/dialog/dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    private subscription: SubscriptionLike;
    title = 'managesystem';
    constructor(public router: Router, private titleService: Title,
        private idleTimeoutService: IdleTimeoutService,  public dialog: MatDialog) {
        this.idleTimeoutService.start();
        this.subscription = this.idleTimeoutService.getUserTimeout().subscribe(userTimeout => {
            if ( userTimeout ) {
                this.openDialog();
                localStorage.removeItem(constant.localstorage_login);
                  localStorage.removeItem(constant.localstorage_employee);
            }

            console.log('getUserTimeout:' + userTimeout);
        });
        this.router.events
            .pipe(filter(event => event instanceof ChildActivationEnd))
            .subscribe(event => {
                let snapshot = (event as ChildActivationEnd).snapshot;
                while (snapshot.firstChild !== null) {
                    snapshot = snapshot.firstChild;
                }
                this.titleService.setTitle(snapshot.data.title || 'SB Admin Angular');
            });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '250px',
          data: {title: 'Logout', content: 'Please login again', noHidden: true},
          disableClose: true,
          hasBackdrop: true
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed : ' + result);
          this.onLoggedout();
        });
    }

    onLoggedout() {
      console.log('onLoggedout');
        this.idleTimeoutService.setUserTimeout(false);
        localStorage.setItem(constant.localstorage_login, 'false');
        localStorage.setItem(constant.localstorage_employee, 'loginEmployee');
        this.router.navigate(['auth']);
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        console.log('ngOnDestroy()');
        this.subscription.unsubscribe();
        this.idleTimeoutService.stop();
    }
}
