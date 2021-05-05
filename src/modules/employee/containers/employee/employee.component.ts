import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-employee',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
