import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeContact } from '@modules/employee/models';

@Component({
    selector: 'sb-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<EditContactComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EmployeeContact
    ) {}
    onNoClick(): void {
        this.dialogRef.close('cancel');
    }
    ngOnInit(): void {}
}
