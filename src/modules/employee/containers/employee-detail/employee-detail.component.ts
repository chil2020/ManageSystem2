import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeBasic } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';
@Component({
    selector: 'sb-employee-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
    employeeBasic!: EmployeeBasic;
    constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {}
    currentId!: number;
    ngOnInit(): void {
        // tslint:disable-next-line:no-non-null-assertion
        const Id = +this.route.snapshot.paramMap.get('id')!;
        this.currentId = Id;
        this.getEmployeeBasic();
    }

    getEmployeeBasic(): void {
        // tslint:disable-next-line:no-non-null-assertion
        // const id = +this.route.snapshot.paramMap.get('id')!;
        this.employeeService
            .getEmployeeBasic(this.currentId)
            .subscribe(employeeBasic => (this.employeeBasic = employeeBasic));
    }
}
