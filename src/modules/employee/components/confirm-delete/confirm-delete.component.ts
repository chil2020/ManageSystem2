import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeBasic } from '@modules/employee/models';

import { EmployeeService } from './../../services/employee.service';

@Component({
    selector: 'sb-confirm-delete',
    templateUrl: './confirm-delete.component.html',
    styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>) {}
    answer!: string;
    ngOnInit(): void {}
    onNoClick(): void {
        this.dialogRef.close();
    }
}
