import { Observable, Subscription } from 'rxjs';
import { UserService } from '@modules/auth/services';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthGuard } from '@modules/auth/guards';
import { constant } from '@modules/constant';
import moment from 'moment';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private authGuard: AuthGuard, private userService: UserService) {}
    username!: string;
    password!: string;
    isFail = false;
    warnMessage = '帳號或密碼錯誤';

    ngOnInit() {}
    verification() {
        this.authGuard.authentcate(this.username).subscribe(result=>{
            console.log(result);
            if(result===this.password){
                const cur = moment().format('YYYY-MM-DDTHH:mm:ss');
                console.log('cur:' + cur);
                this.isFail=false;
                // sessionStorage.setItem('user', this.username);
                localStorage.setItem(constant.localstorage_login_time, cur);
                localStorage.setItem(constant.localstorage_login, 'true');
                localStorage.setItem(constant.localstorage_employee, this.username);
                this.router.navigate(['dashboard']);
                console.log('success');
            }
            else
            {
                this.isFail=true;
                console.log('error');}
        })
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
