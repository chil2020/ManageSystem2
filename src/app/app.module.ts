import { IdleTimeoutService } from './idle-timeout/idle-timeout.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { LayoutModule } from '@angular/cdk/layout';
import { IdleTimeoutComponent } from './idle-timeout/idle-timeout.component';
@NgModule({
    declarations: [AppComponent, IdleTimeoutComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatButtonModule,
        ModalModule,
        NgIdleKeepaliveModule.forRoot(),
        LayoutModule
    ],
    providers: [IdleTimeoutService],
    bootstrap: [AppComponent],
})
export class AppModule {}
