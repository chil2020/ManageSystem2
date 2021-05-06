import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthGuard } from '@modules/auth/guards';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(private router: Router, private authGuard: AuthGuard) {}
    username!: string;
    password!: string;
    isFail = false;
    warnMessage = '帳號或密碼錯誤';

    ngOnInit() {}
    verification() {
        if (this.authGuard.authentcate(this.username, this.password)) {
            sessionStorage.setItem('user', this.username);
            this.isFail = false;
            console.warn('ok');
            this.router.navigate([`/dashboard`]);
        } else {
            console.warn('fuck you');
            this.isFail = true;
        }
    }

    /** 6. 是否已經登入 */
    isLogin() {
        return sessionStorage.getItem('user') !== null;
    }

    /** 7. 登出 */
    logout() {
        sessionStorage.removeItem('user');
    }
}
