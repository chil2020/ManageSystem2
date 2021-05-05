import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeExperience } from '@modules/employee/models';

@Component({
    selector: 'sb-edit-experience',
    templateUrl: './edit-experience.component.html',
    styleUrls: ['./edit-experience.component.scss'],
})
export class EditExperienceComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<EditExperienceComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EmployeeExperience
    ) {}
    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {}
}
