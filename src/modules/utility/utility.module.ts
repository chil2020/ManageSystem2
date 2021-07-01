/* eslint-disable import/order */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as utilityComponents from './components';

/* Containers */
import * as utilityContainers from './containers';

/* Guards */
import * as utilityGuards from './guards';

/* Services */
import * as utilityServices from './services';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...utilityServices.services, ...utilityGuards.guards],
    declarations: [...utilityContainers.containers, ...utilityComponents.components, DialogComponent],
    exports: [...utilityContainers.containers, ...utilityComponents.components],
})
export class UtilityModule {}
