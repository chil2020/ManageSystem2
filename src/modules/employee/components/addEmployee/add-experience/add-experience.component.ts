import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeExperience } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';

@Component({
    selector: 'sb-add-experience',
    templateUrl: './add-experience.component.html',
    styleUrls: ['./add-experience.component.scss'],
})
export class AddExperienceComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<AddExperienceComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EmployeeExperience
    ) {}
    basicname = new FormControl('', [Validators.required]);
    basicposition = new FormControl('', [Validators.required]);
    surveyForm = FormGroup;
    onNoClick(): void {
        this.dialogRef.close('cancel');
    }
    ngOnInit(): void {}
}
