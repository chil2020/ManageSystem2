import { EmployeeService } from './employee.service';
import { MessageService } from './message.service';

export const services = [EmployeeService, MessageService];

export * from './employee.service';
export * from './message.service';
