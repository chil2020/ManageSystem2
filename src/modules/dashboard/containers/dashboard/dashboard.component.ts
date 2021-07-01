import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IdleTimeoutService } from '@app/idle-timeout/idle-timeout.service';
import { constant } from '@modules/constant';
import { DialogComponent } from '@modules/utility/components/dialog/dialog.component';
import { Observable, SubscriptionLike } from 'rxjs';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    private subscription: SubscriptionLike;
    isHandset$!: Observable<boolean>;
    constructor(public router: Router, private idleTimeoutService: IdleTimeoutService,
         public dialog: MatDialog,) {
        this.idleTimeoutService.start();
        this.subscription = this.idleTimeoutService.getUserTimeout().subscribe(userTimeout => {
            if ( userTimeout ) {
            this.openDialog();
            localStorage.removeItem(constant.localstorage_login);
	          localStorage.removeItem(constant.localstorage_employee);
        }

        console.log('getUserTimeout:' + userTimeout);
      });
    }


    ngOnInit() {
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
