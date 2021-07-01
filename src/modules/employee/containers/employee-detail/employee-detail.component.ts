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
    constructor(private route: ActivatedRoute) {}
    currentId!: number;
    imagePath!: any;
    ngOnInit(): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const Id = +this.route.snapshot.paramMap.get('id')!;
        this.currentId = Id;
    }
}
