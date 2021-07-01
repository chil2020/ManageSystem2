import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';

@Component({
  selector: 'sb-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.scss']
})
export class AddPictureComponent implements OnInit {
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
