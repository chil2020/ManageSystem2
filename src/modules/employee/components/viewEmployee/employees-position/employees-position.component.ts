import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeePosition } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';
import { AddPositionComponent, ConfirmDeleteComponent, EditPositionComponent } from '../..';


@Component({
    selector: 'sb-employees-position',
    templateUrl: './employees-position.component.html',
    styleUrls: ['./employees-position.component.scss'],
})
export class EmployeesPositionComponent implements OnInit {
    constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}
    @Input() id!: number;
    employeePositions!: EmployeePosition[];

    getEmployeePositions(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        // const id = +this.route.snapshot.paramMap.get('id')!;
        this.employeeService
            .getEmployeePositions(this.id)
            .subscribe(employeePositions => (this.employeePositions = employeePositions));
    }
    ngOnInit(): void {
        this.getEmployeePositions();
    }

    openConfirmDialog(employeePosition: EmployeePosition): void {
        const confirmDialogRef = this.dialog.open(ConfirmDeleteComponent, {
            width: '250px',
            data: { Position: employeePosition },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            if (result === 'Delete') {
                console.log('The dialog was closed ' + result);
                this.deletePosition(employeePosition);
            }
        });
    }

    deletePosition(employeePosition: EmployeePosition): void {
        this.employeePositions = this.employeePositions.filter(e => e !== employeePosition);
        this.employeeService.deletePosition(employeePosition).subscribe();
    }

    openEditDialog(employeePosition: EmployeePosition): void {
        const confirmDialogRef = this.dialog.open(EditPositionComponent, {
            width: '250px',
            data: {
                id: employeePosition.id,
                institution: employeePosition.institution,
                unit: employeePosition.unit,
                position: employeePosition.position,
            },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            if (result !== 'cancel') {
                console.log('The dialog was closed ' + result.id);
                this.editEmployeePosition(result);
            }
        });
    }

    editEmployeePosition(employeePosition: EmployeePosition) {
        this.employeeService
            .updateEmployeePosition(employeePosition)
            .subscribe(() => this.getEmployeePositions());
    }

    openAddDialog(): void {
        const confirmDialogRef = this.dialog.open(AddPositionComponent, {
            width: '250px',
            data: {
                institution: '',
                unit: '',
                position: '',
            },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            if (result !== 'cancel') {
                if (Object.keys(result.institution).length !== 0) {
                    console.log('Add:' + result.institution);
                    this.addEmployeePosition(result);
                }
            }
        });
    }

    addEmployeePosition(employeePosition: EmployeePosition) {
        const institution = employeePosition.institution.trim();
        const unit = employeePosition.unit.trim();
        const position = employeePosition.position.trim();
        if (!institution || !unit || !position) {
            return;
        }
        this.employeeService
            .addPosition({ id: this.id, institution, unit, position } as EmployeePosition)
            .subscribe(() => this.getEmployeePositions());
    }
}
