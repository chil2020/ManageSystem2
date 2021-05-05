import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeContact } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';

@Component({
    selector: 'sb-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<AddContactComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EmployeeContact
    ) {}
    basicname = new FormControl('', [Validators.required]);
    basicposition = new FormControl('', [Validators.required]);
    surveyForm = FormGroup;
    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {}
}
