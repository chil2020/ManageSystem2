import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'sb-edit-basic',
    templateUrl: './edit-basic.component.html',
    styleUrls: ['./edit-basic.component.scss'],
})
export class EditBasicComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<EditBasicComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {}
    imgServerURL!: any;
    ngOnInit(): void {
        this.imgServerURL=this.data.imagePath;
    }
    @ViewChild('fileInput') fileInput!: ElementRef;
    fileAttr = 'Choose File';
    basicname = new FormControl('', [Validators.required]);
    basicposition = new FormControl('', [Validators.required]);
    surveyForm = FormGroup;
    onNoClick(): void {
        this.dialogRef.close('cancel');
    }

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
              this.imgServerURL = imgBase64Path;
            };
          };
          reader.readAsDataURL(imgFile.target.files[0]);
          this.data.image = imgFile.target.files[0];
          this.data.imagePath = imgFile.target.files[0].name;
          // Reset if duplicate image uploaded again
          this.fileInput.nativeElement.value = "";

        } else {
          this.fileAttr = 'Choose File';
        }

      }

}
