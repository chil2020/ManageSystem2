import { IdleTimeoutComponent } from './../../app/idle-timeout/idle-timeout.component';
/* eslint-disable import/order */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IdleTimeoutService } from '@app/idle-timeout/idle-timeout.service';
/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ChartsModule } from '@modules/charts/charts.module';
import { TablesModule } from '@modules/tables/tables.module';

/* Components */
import * as dashboardComponents from './components';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Services */
import * as dashboardServices from './services';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        ChartsModule,
        TablesModule,
        MatDialogModule,
        NgIdleKeepaliveModule.forRoot()
    ],
    providers: [...dashboardServices.services, ...dashboardGuards.guards],
    declarations: [...dashboardContainers.containers, ...dashboardComponents.components ],
    exports: [...dashboardContainers.containers, ...dashboardComponents.components],
})
export class DashboardModule {}
