import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input, VERSION } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { constant, SERVER_URL } from '@modules/constant';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'sb-employees-picture',
  templateUrl: './employees-picture.component.html',
  styleUrls: ['./employees-picture.component.scss']
})
export class EmployeesPictureComponent implements OnInit {
    name = 'Angular ' + VERSION.major;
    dataimage:any;
    ngOnInit(): void {
    }
    @ViewChild('fileInput') fileInput!: ElementRef;
    fileAttr = 'Choose File';


    uploadFileEvt(imgFile: any) {
      if (imgFile.target.files[0]) {
        this.fileAttr = imgFile.target.files[0].name;

        // HTML5 FileReader API
        let reader = new FileReader();
        reader.onload = (e: any) => {
          let image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            let imgBase64Path = e.target.result;
            this.dataimage = imgBase64Path;
          };
        };
        reader.readAsDataURL(imgFile.target.files[0]);

        // Reset if duplicate image uploaded again
        this.fileInput.nativeElement.value = "";
      } else {
        this.fileAttr = 'Choose File';
      }
    }

  }
