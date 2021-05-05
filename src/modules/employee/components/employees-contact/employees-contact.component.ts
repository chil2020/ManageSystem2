import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeContact } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';

import { AddContactComponent } from '../addEmployee/add-contact/add-contact.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { EditContactComponent } from '../editEmployee/edit-contact/edit-contact.component';



@Component({
    selector: 'sb-employees-contact',
    templateUrl: './employees-contact.component.html',
    styleUrls: ['./employees-contact.component.scss'],
})
export class EmployeesContactComponent implements OnInit {
    constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}
    @Input() id: any;
    employeeContacts!: EmployeeContact[];
    answer!: 'Delete';
    getEmployeeContacts(): void {
        // tslint:disable-next-line:no-non-null-assertion
        // const id = +this.route.snapshot.paramMap.get('id')!;
        this.employeeService
            .getEmployeeContacts(this.id)
            .subscribe(employeeContacts => (this.employeeContacts = employeeContacts));
    }
    ngOnInit(): void {
        this.getEmployeeContacts();
    }

    openConfirmDialog(employeeContact: EmployeeContact): void {
        const confirmDialogRef = this.dialog.open(ConfirmDeleteComponent, {
            width: '250px',
            data: { Contact: employeeContact },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result);
            if (result === 'Delete') {
                this.deleteContact(employeeContact);
            }
        });
    }

    deleteContact(employeeContact: EmployeeContact): void {
        this.employeeContacts = this.employeeContacts.filter(e => e !== employeeContact);
        this.employeeService.deleteContact(employeeContact).subscribe();
    }

    openEditDialog(employeeContact: EmployeeContact): void {
        const confirmDialogRef = this.dialog.open(EditContactComponent, {
            width: '250px',
            data: {
                id: employeeContact.id,
                address: employeeContact.address,
                email: employeeContact.email,
                phone: employeeContact.phone,
            },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result.id);
            this.editEmployeeContact(result);
        });
    }

    editEmployeeContact(employeeContact: EmployeeContact) {
        this.employeeService
            .updateEmployeeContact(employeeContact)
            .subscribe(() => this.getEmployeeContacts());
    }

    openAddDialog(): void {
        const confirmDialogRef = this.dialog.open(AddContactComponent, {
            width: '250px',
            data: {
                address: '',
                email: '',
                phone: '',
            },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result.id);
            this.addEmployeeContact(result);
        });
    }

    addEmployeeContact(employeeContact: EmployeeContact) {
        const address = employeeContact.address.trim();
        const email = employeeContact.email.trim();
        const phone = employeeContact.phone.trim();
        if (!address || !email || !phone) {
            return;
        }
        this.employeeService
            .addContact({ id: this.id, address, email, phone } as EmployeeContact)
            .subscribe(() => this.getEmployeeContacts());
    }
}
