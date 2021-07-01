import { EmployeesPositionComponent } from './../components/viewEmployee/employees-position/employees-position.component';
import { EmployeesEducationComponent } from './../components/viewEmployee/employees-education/employees-education.component';
import { EmployeesExperienceComponent } from './../components/viewEmployee/employees-experience/employees-experience.component';
import { EmployeesContactComponent } from './../components/viewEmployee/employees-contact/employees-contact.component';
import { EmployeesPictureComponent } from '../components/viewEmployee/employees-picture/employees-picture.component';
import { SosComponent } from './sos/sos.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeComponent } from './employee/employee.component';

export const containers = [EmployeeComponent, EmployeeDetailComponent, SosComponent,
    EmployeesPictureComponent, EmployeesPositionComponent, EmployeesEducationComponent,
    EmployeesExperienceComponent, EmployeesContactComponent];

export * from './employee/employee.component';
export * from './employee-detail/employee-detail.component';
export * from './sos/sos.component';
export * from '../components/viewEmployee/employees-picture/employees-picture.component';
