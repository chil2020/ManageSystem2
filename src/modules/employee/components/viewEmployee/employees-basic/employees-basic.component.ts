import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { constant, SERVER_URL } from '@modules/constant';
import { EmployeeBasic } from '@modules/employee/models';
import { EmployeeService } from '@modules/employee/services';
import { EditBasicComponent } from '../..';

@Component({
  selector: 'sb-employees-basic',
  templateUrl: './employees-basic.component.html',
  styleUrls: ['./employees-basic.component.scss']
})
export class EmployeesBasicComponent implements OnInit {
  @Input() id: any;
  employeeBasic!: EmployeeBasic;
  private baseUrl =  constant.ServerPath;
  imgServerURL!: any;
  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.getEmployeeBasic();
  }

  getEmployeeBasic(): void {
    this.employeeService
        .getEmployeeBasic(this.id)
        .subscribe(employeeBasic => {
            this.employeeBasic = employeeBasic;
            this.imgServerURL=this.baseUrl+SERVER_URL.Picture+'/'+this.employeeBasic.imagePath;

        });

    }

    openEditDialog(employeeBasic: EmployeeBasic): void {
        const confirmDialogRef = this.dialog.open(EditBasicComponent, {
            data: {
                id: employeeBasic.id,
                name: employeeBasic.name,
                position: employeeBasic.position,
                profession: employeeBasic.profession,
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
                        this.getEmployeeBasic();
                      } , error => console.log(error));
                    // this.employeeService.addPicture(result.id, image);
                }
            this.getEmployeeBasic();
        });
    }
}
