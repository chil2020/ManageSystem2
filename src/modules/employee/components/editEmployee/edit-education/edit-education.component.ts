import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeEducation } from '@modules/employee/models';

@Component({
    selector: 'sb-edit-education',
    templateUrl: './edit-education.component.html',
    styleUrls: ['./edit-education.component.scss'],
})
export class EditEducationComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<EditEducationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EmployeeEducation
    ) {}
    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {}
}
