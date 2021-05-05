/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Module */
import { EmployeeModule } from './employee.module';

/* Containers */
import * as employeeContainers from './containers';

import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: employeeContainers.EmployeeComponent,
        data: {
            title: 'Employee - SB Admin Angular',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Employee',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'detail/:id',
        canActivate: [],
        component: employeeContainers.EmployeeDetailComponent,
        data: {
            title: 'Employee-Detail',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Employee',
                    link: '/employee',
                },
                {
                    text: 'Employee-Detail',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
    imports: [EmployeeModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class EmployeeRoutingModule {}
