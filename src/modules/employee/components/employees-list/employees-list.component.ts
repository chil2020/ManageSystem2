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
import { HttpClient } from '@angular/common/http';
import { constant, SERVER_URL } from '@modules/constant';

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
    employeeBasic!: EmployeeBasic;
    private baseUrl =  constant.ServerPath;
    currentPage!: PageEvent;
    currentSort!: Sort;
    searchText: any;
    uploadimage!: File;
    uploadid!: number;
    isMobile!: string;
    imgServerURL!: any;
    dataSource = new MatTableDataSource(this.employeeBasics);
    constructor(private breakpointObserver: BreakpointObserver,private employeeService: EmployeeService, private dialog: MatDialog, private http: HttpClient) {}

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

    getEmployeeBasic(id: any): void {
        this.employeeService
            .getEmployeeBasic(id)
            .subscribe(employeeBasic => {
                this.employeeBasic = employeeBasic;
                this.imgServerURL=this.baseUrl+SERVER_URL.Picture+'/'+this.employeeBasic.imagePath;

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
            data: {
                id: employeeBasic.id,
                name: employeeBasic.name,
                position: employeeBasic.position,
                profession: employeeBasic.profession,
                dept: employeeBasic.dept,
                company: employeeBasic.company,
                imagePath: this.imgServerURL
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
        const image = employeeBasic.image;
        const imageName = employeeBasic.imagePath;
        this.employeeService.updateEmployeeBasic(employeeBasic).subscribe(result =>
        {
            if(image != null)
                {
                    const formData = new FormData();
                    formData.append('files', image, result.id+'_'+imageName)
                    this.http.post(this.baseUrl+SERVER_URL.Picture, formData).subscribe(() => {
                        this.getEmployeeBasic(result.id);
                      } , error => console.log(error));
                    // this.employeeService.addPicture(result.id, image);
                }
                this.getEmployeeBasic(result.id);
        });
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
        const dept = employeeBasic.dept.trim();
        const company = employeeBasic.company.trim();
        const image = employeeBasic.image;
        const imagePath = employeeBasic.imagePath;
        if (!name || !position || !profession) {
            return;
        }
        this.employeeService
            .addBasic({ name, position, profession, dept, company } as EmployeeBasic)
            .subscribe(result => {
                if(image != null)
                {this.employeeService.addPicture(result.id, image, imagePath);}
                this.getBasics();
            });

    }
}
