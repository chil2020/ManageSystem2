import { MatDialogModule } from '@angular/material/dialog';
/* eslint-disable import/order */
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as employeeComponents from './components';
/* Containers */
import * as employeeContainers from './containers';

/* Directives */
// import * as tablesDirectives from './directives';

/* Guards */
// import * as tablesGuards from './guards';

/* Services */
import * as employeeServices from './services';
import { SosComponent } from './components/sos/sos.component';
import { AddPictureComponent } from './components/addEmployee/add-picture/add-picture.component';
import { EmployeesBasicComponent } from './components/viewEmployee/employees-basic/employees-basic.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        MatTabsModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
    ],
    providers: [
        DecimalPipe,
        ...employeeServices.services,
        // ...tablesGuards.guards,
        // ...tablesDirectives.directives,
    ],
    declarations: [
        ...employeeContainers.containers,
        ...employeeComponents.components,
        SosComponent,
        AddPictureComponent,
        EmployeesBasicComponent,
        // ...tablesDirectives.directives,
    ],

    exports: [...employeeContainers.containers, ...employeeComponents.components,],
    entryComponents: [
        employeeComponents.AddBasicComponent,
        employeeComponents.AddContactComponent,
        employeeComponents.AddEducationComponent,
        employeeComponents.AddExperienceComponent,
        employeeComponents.AddPositionComponent,
        employeeComponents.EditBasicComponent,
        employeeComponents.EditContactComponent,
        employeeComponents.EditEducationComponent,
        employeeComponents.EditExperienceComponent,
        employeeComponents.EditPositionComponent,
        employeeComponents.ConfirmDeleteComponent,
    ],
})
export class EmployeeModule {}
