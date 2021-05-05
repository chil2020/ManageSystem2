import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeBasic } from '@modules/employee/models';

@Component({
    selector: 'sb-edit-basic',
    templateUrl: './edit-basic.component.html',
    styleUrls: ['./edit-basic.component.scss'],
})
export class EditBasicComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<EditBasicComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EmployeeBasic
    ) {}
    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {}
}
