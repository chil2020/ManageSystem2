import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeExperience } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';

import { AddExperienceComponent } from '../addEmployee/add-experience/add-experience.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { EditExperienceComponent } from '../editEmployee/edit-experience/edit-experience.component';

@Component({
    selector: 'sb-employees-experience',
    templateUrl: './employees-experience.component.html',
    styleUrls: ['./employees-experience.component.scss'],
})
export class EmployeesExperienceComponent implements OnInit {
    constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}
    @Input() id: any;
    employeeExperiences!: EmployeeExperience[];

    getEmployeeExperiences(): void {
        // tslint:disable-next-line:no-non-null-assertion
        // const id = +this.route.snapshot.paramMap.get('id')!;
        this.employeeService
            .getEmployeeExperiences(this.id)
            .subscribe(employeeExperiences => (this.employeeExperiences = employeeExperiences));
    }
    ngOnInit(): void {
        this.getEmployeeExperiences();
    }

    openConfirmDialog(employeeExperience: EmployeeExperience): void {
        const confirmDialogRef = this.dialog.open(ConfirmDeleteComponent, {
            width: '250px',
            data: { Experience: employeeExperience },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result);
            if (result === 'Delete') {
                this.deleteExperience(employeeExperience);
            }
        });
    }

    deleteExperience(employeeExperience: EmployeeExperience): void {
        this.employeeExperiences = this.employeeExperiences.filter(e => e !== employeeExperience);
        this.employeeService.deleteExperience(employeeExperience).subscribe();
    }

    openEditDialog(employeeExperience: EmployeeExperience): void {
        const confirmDialogRef = this.dialog.open(EditExperienceComponent, {
            width: '250px',
            data: {
                id: employeeExperience.id,
                institution: employeeExperience.institution,
                unit: employeeExperience.unit,
                position: employeeExperience.position,
                during: employeeExperience.during,
            },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result.id);
            this.editEmployeeExperience(result);
        });
    }

    editEmployeeExperience(employeeExperience: EmployeeExperience) {
        this.employeeService
            .updateEmployeeExperience(employeeExperience)
            .subscribe(() => this.getEmployeeExperiences());
    }

    openAddDialog(): void {
        const confirmDialogRef = this.dialog.open(AddExperienceComponent, {
            width: '250px',
            data: {
                institution: '',
                unit: '',
                position: '',
                during: '',
            },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result.id);
            this.addEmployeeExperience(result);
        });
    }

    addEmployeeExperience(employeeExperience: EmployeeExperience) {
        const institution = employeeExperience.institution.trim();
        const unit = employeeExperience.unit.trim();
        const position = employeeExperience.position.trim();
        const during = employeeExperience.during.trim();
        if (!institution || !unit || !position || !during) {
            return;
        }
        this.employeeService
            .addExperience({
                id: this.id,
                institution,
                unit,
                position,
                during,
            } as EmployeeExperience)
            .subscribe(() => this.getEmployeeExperiences());
    }
}
