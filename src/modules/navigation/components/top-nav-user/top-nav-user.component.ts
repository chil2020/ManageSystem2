import { NavigationGuard } from './../../guards/navigation.guard';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '@modules/auth/guards';
import { UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(
        public userService: UserService,
        private authGuard: AuthGuard,
        private router: Router
    ) {}
    ngOnInit() {}

    Logout() {
        this.authGuard.clearSession();
        this.router.navigate([`/auth`]);
    }
}
