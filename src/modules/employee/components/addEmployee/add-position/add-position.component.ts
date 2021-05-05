import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeBasic, EmployeePosition } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';

@Component({
    selector: 'sb-add-position',
    templateUrl: './add-position.component.html',
    styleUrls: ['./add-position.component.scss'],
})
export class AddPositionComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<AddPositionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EmployeePosition
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
