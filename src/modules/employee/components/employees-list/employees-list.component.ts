import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeBasic } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';
import { AddBasicComponent } from '../addEmployee/add-basic/add-basic.component';
import { EditBasicComponent } from '../editEmployee/edit-basic/edit-basic.component';
import { ConfirmDeleteComponent } from './../confirm-delete/confirm-delete.component';
import 'rxjs/add/operator/map'

@Component({
    selector: 'sb-employees-list',
    templateUrl: './employees-list.component.html',
    styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit {
    isHandset$!: Observable<boolean>;
    @ViewChild('paginator') paginator!: MatPaginator;
    @ViewChild('sortTable') sortTable!: MatSort;
    totalCount!: number;
    employeeBasics!: EmployeeBasic[];
    currentPage!: PageEvent;
    currentSort!: Sort;
    searchText: any;
    uploadimage!: File;
    uploadid!: number;
    isMobile!: string;
    dataSource = new MatTableDataSource(this.employeeBasics);
    constructor(private breakpointObserver: BreakpointObserver,private employeeService: EmployeeService, private dialog: MatDialog) {}

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngAfterViewInit(): void {
        // 分頁切換時，重新取得資料
        this.paginator.page.subscribe((page: PageEvent) => {
            this.currentPage = page;
            this.getBasics();
        });
    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();
        this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
            return data.name.indexOf(filter) !== -1;
        };
    }
    ngOnInit(): void {
        this.breakpointObserver.observe(Breakpoints.Handset)
        .subscribe((state: BreakpointState) => {
            if (state.matches) {
                this.isMobile = 'Mobile';
                console.log('Mobile');
            } else {
                this.isMobile = 'Web';
                console.log('Web');
            }
        });

        this.currentSort = {
            active: 'updateTime',
            direction: 'desc',
        };
        this.currentPage = {
            pageIndex: 0,
            pageSize: 5,
            length: this.totalCount,
        };
        this.getBasics();
    }

    changeSort(sortInfo: Sort) {
        if (sortInfo.active === 'updateTime') {
            sortInfo.active = 'updateTime';
            sortInfo.direction = 'desc';
        } else if (sortInfo.active === 'name') {
            sortInfo.active = 'name';
            sortInfo.direction = 'desc';
        }
        this.currentSort = sortInfo;
        this.getBasics();
    }

    getBasics(): void {
        this.employeeService
            .getEmployeeBasics(
                this.currentPage.pageIndex,
                this.currentPage.pageSize,
                this.currentSort.active,
                this.currentSort.direction
            )
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
            if (result === 'Delete') {
                console.log('The dialog was closed ' + result);
                this.deleteBasic(employeeBasic);
            }

        });
    }

    deleteBasic(employeeBasic: EmployeeBasic): void {
        this.employeeService.deleteBasic(employeeBasic).subscribe(() => this.getBasics());
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
            if (result !== 'cancel') {
                console.log('The dialog was closed ' + result.id);
                this.editEmployeeBasic(result);
            }
        });
    }

    editEmployeeBasic(employeeBasic: EmployeeBasic) {
        this.employeeService.updateEmployeeBasic(employeeBasic).subscribe(() => this.getBasics());
    }

    openAddDialog(): void {
        const confirmDialogRef = this.dialog.open(AddBasicComponent, {
            data: {
                name: '',
                position: '',
                profession: '',
            },
        });
        confirmDialogRef.afterClosed().subscribe(result => {
            if (result !== 'cancel') {
                if (Object.keys(result.name).length !== 0) {
                    console.log('Add:' + result.name);
                    this.addEmployeeBasic(result);
                }
            }
        });
    }
    addEmployeeBasic(employeeBasic: EmployeeBasic) {
        const name = employeeBasic.name.trim();
        const position = employeeBasic.position.trim();
        const profession = employeeBasic.profession.trim();
        const image = employeeBasic.image;
        const imagePath = employeeBasic.imagePath;
        if (!name || !position || !profession) {
            return;
        }
        this.employeeService
            .addBasic({ name, position, profession } as EmployeeBasic)
            .subscribe(result => {
                if(image != null)
                {this.employeeService.addPicture(result.id, image, imagePath);}
                this.getBasics();
            });

    }
}
