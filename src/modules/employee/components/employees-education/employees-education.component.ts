import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEducation } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';

import { AddEducationComponent } from '../addEmployee/add-education/add-education.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { EditEducationComponent } from '../editEmployee/edit-education/edit-education.component';


@Component({
    selector: 'sb-employees-education',
    templateUrl: './employees-education.component.html',
    styleUrls: ['./employees-education.component.scss'],
})
export class EmployeesEducationComponent implements OnInit {
    constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}
    @Input() id: any;
    employeeEducations!: EmployeeEducation[];

    getEmployeeEducations(): void {
        // tslint:disable-next-line:no-non-null-assertion
        // const id = +this.route.snapshot.paramMap.get('id')!;
        this.employeeService
            .getEmployeeEducations(this.id)
            .subscribe(employeeEducations => (this.employeeEducations = employeeEducations));
    }
    ngOnInit(): void {
        this.getEmployeeEducations();
    }

    openConfirmDialog(employeeEducation: EmployeeEducation): void {
        const confirmDialogRef = this.dialog.open(ConfirmDeleteComponent, {
            width: '250px',
            data: { Education: employeeEducation },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result);
            if (result === 'Delete') {
                this.deleteEducation(employeeEducation);
            }
        });
    }

    deleteEducation(employeeEducation: EmployeeEducation): void {
        this.employeeEducations = this.employeeEducations.filter(e => e !== employeeEducation);
        this.employeeService.deleteEducation(employeeEducation).subscribe();
    }

    openEditDialog(employeeEducation: EmployeeEducation): void {
        const confirmDialogRef = this.dialog.open(EditEducationComponent, {
            width: '250px',
            data: {
                id: employeeEducation.id,
                school: employeeEducation.school,
                department: employeeEducation.department,
                education: employeeEducation.education,
                status: employeeEducation.status,
                region: employeeEducation.region,
            },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result.id);
            this.editEmployeeEducation(result);
        });
    }

    editEmployeeEducation(employeeEducation: EmployeeEducation) {
        this.employeeService
            .updateEmployeeEducation(employeeEducation)
            .subscribe(() => this.getEmployeeEducations());
    }
    openAddDialog(): void {
        const confirmDialogRef = this.dialog.open(AddEducationComponent, {
            width: '250px',
            data: {
                school: '',
                department: '',
                education: '',
                status: '',
                region: '',
            },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result.id);
            this.addEmployeeEducation(result);
        });
    }

    addEmployeeEducation(employeeEducation: EmployeeEducation) {
        const school = employeeEducation.school.trim();
        const department = employeeEducation.department.trim();
        const education = employeeEducation.education.trim();
        const status = employeeEducation.status.trim();
        const region = employeeEducation.region.trim();
        if (!school || !department || !education || !status || !region) {
            return;
        }
        this.employeeService
            .addEducation({
                id: this.id,
                school,
                department,
                education,
                status,
                region,
            } as EmployeeEducation)
            .subscribe(() => this.getEmployeeEducations());
    }
}
