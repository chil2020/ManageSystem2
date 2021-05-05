import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeEducation } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';


@Component({
    selector: 'sb-add-education',
    templateUrl: './add-education.component.html',
    styleUrls: ['./add-education.component.scss'],
})
export class AddEducationComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<AddEducationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EmployeeEducation
    ) {}
    basicname = new FormControl('', [Validators.required]);
    basicposition = new FormControl('', [Validators.required]);

    surveyForm = FormGroup;
    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {}
}
