import { UserService } from '@modules/auth/services';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '@modules/auth/guards';
import { constant } from '@modules/constant';
import moment from 'moment';
import { AESEncryptDecryptService } from '@modules/auth/services/aesencrypt-decrypt.service';
@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private authGuard: AuthGuard, private _AESEncryptDecryptService: AESEncryptDecryptService) {}
    username!: string;
    password!: string;
    isFail = false;
    warnMessage = '帳號或密碼錯誤';

    ngOnInit() {}
    verification() {
        this.authGuard.authentcate(this.username).subscribe(result=>{
            console.log(result);
            let result_pwd = this._AESEncryptDecryptService.decrypt(result);
            let login_pwd = this._AESEncryptDecryptService.encrypt(this.password);

            console.log(this.password);
            console.log(result_pwd);
            if(result_pwd===this.password){
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
        return localStorage.getItem(constant.localstorage_employee) !== null;
    }

    /** 7. 登出 */
    logout() {
        localStorage.removeItem(constant.localstorage_employee);
    }
}
