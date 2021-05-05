import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeBasic } from '@modules/employee/models';

@Component({
    selector: 'sb-add-basic',
    templateUrl: './add-basic.component.html',
    styleUrls: ['./add-basic.component.scss'],
})
export class AddBasicComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<AddBasicComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EmployeeBasic
    ) {}
    basicname = new FormControl('', [Validators.required]);
    basicposition = new FormControl('', [Validators.required]);
    employees!: EmployeeBasic[];
    surveyForm = FormGroup;
    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {}
}
