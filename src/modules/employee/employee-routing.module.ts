/* eslint-disable import/order */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Module */
import { EmployeeModule } from './employee.module';

/* Containers */
import * as employeeContainers from './containers';

/* Guards */
import { AuthGuard } from './../auth/guards/auth.guard';

import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: employeeContainers.EmployeeComponent,
        data: {
            title: 'Employee-List',
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
        canActivate: [AuthGuard],
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
    {
        path: 'sos',
        canActivate: [AuthGuard],
        component: employeeContainers.SosComponent,
        data: {
            title: 'SOS',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'SOS',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
    {
        path: 'picture',
        canActivate: [AuthGuard],
        component: employeeContainers.EmployeesPictureComponent,
        data: {
            title: 'picture',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'picture',
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
