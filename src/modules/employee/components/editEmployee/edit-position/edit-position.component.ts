import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeePosition } from '@modules/employee/models';

@Component({
    selector: 'sb-edit-position',
    templateUrl: './edit-position.component.html',
    styleUrls: ['./edit-position.component.scss'],
})
export class EditPositionComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<EditPositionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EmployeePosition
    ) {}
    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {}
}
