import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmployeeBasic } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';

import { AddBasicComponent } from '../addEmployee/add-basic/add-basic.component';
import { EditBasicComponent } from '../editEmployee/edit-basic/edit-basic.component';

import { ConfirmDeleteComponent } from './../confirm-delete/confirm-delete.component';

@Component({
    selector: 'sb-employees-list',
    templateUrl: './employees-list.component.html',
    styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit {
    @ViewChild('paginator') paginator!: MatPaginator;
    @ViewChild('sortTable') sortTable!: MatSort;
    totalCount!: number;
    employeeBasics!: EmployeeBasic[];
    currentPage!: PageEvent;
    currentSort!: Sort;
    searchText: any;
    dataSource = new MatTableDataSource(this.employeeBasics);
    constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}

    // tslint:disable-next-line:use-lifecycle-interface
    ngAfterViewInit(): void {
        // 分頁切換時，重新取得資料
        this.paginator.page.subscribe((page: PageEvent) => {
            this.currentPage = page;
            this.getBasics();
        });
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
            return data.name.indexOf(filter) !== -1;
        };
    }
    ngOnInit(): void {
        this.currentSort = {
            active: '',
            direction: '',
        };
        this.currentPage = {
            pageIndex: 0,
            pageSize: 5,
            length: this.totalCount,
        };
        this.getBasics();
    }

    changeSort(sortInfo: Sort) {
        if (sortInfo.active === 'created_at') {
            sortInfo.active = 'created';
        }
        this.currentSort = sortInfo;
        this.getBasics();
    }

    getBasics(): void {
        this.employeeService
            .getEmployeeBasics(this.currentPage.pageIndex, this.currentPage.pageSize)
            .subscribe(data => {
                this.totalCount = data.totalElements;
                this.employeeBasics = data.content;
                this.dataSource = new MatTableDataSource(this.employeeBasics);
            });
    }

    openConfirmDialog(employeeBasic: EmployeeBasic): void {
        const confirmDialogRef = this.dialog.open(ConfirmDeleteComponent, {
            width: '250px',
            data: { Basic: employeeBasic },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result);
            if (result === 'Delete') {
                this.deleteBasic(employeeBasic);
            }
        });
    }

    deleteBasic(employeeBasic: EmployeeBasic): void {
        this.employeeBasics = this.employeeBasics.filter(e => e !== employeeBasic);
        this.employeeService.deleteBasic(employeeBasic).subscribe();
    }

    openEditDialog(employeeBasic: EmployeeBasic): void {
        const confirmDialogRef = this.dialog.open(EditBasicComponent, {
            width: '250px',
            data: {
                id: employeeBasic.id,
                name: employeeBasic.name,
                position: employeeBasic.position,
                profession: employeeBasic.profession,
            },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result.id);
            this.editEmployeeBasic(result);
        });
    }

    editEmployeeBasic(employeeBasic: EmployeeBasic) {
        this.employeeService.updateEmployeeBasic(employeeBasic).subscribe(() => this.getBasics());
    }

    openAddDialog(): void {
        const confirmDialogRef = this.dialog.open(AddBasicComponent, {
            width: '250px',
            data: {
                name: '',
                position: '',
                profession: '',
            },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + result.id);
            this.addEmployeeBasic(result);
        });
    }

    addEmployeeBasic(employeeBasic: EmployeeBasic) {
        const name = employeeBasic.name.trim();
        const position = employeeBasic.position.trim();
        const profession = employeeBasic.profession.trim();
        if (!name || !position || !profession) {
            return;
        }
        this.employeeService
            .addBasic({ name, position, profession } as EmployeeBasic)
            .subscribe(() => this.getBasics());
    }
}
