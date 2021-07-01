import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string;
    content: string;
    yesHidden: boolean;
    noHidden: boolean;
  }
@Component({
  selector: 'sb-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
 // result: string;
 dialogContent!: string;
 dialogTitle!: string;
 data: DialogData;

 constructor(
   public dialogRef: MatDialogRef<DialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data1: DialogData ) {
     this.data = data1;


   }
    ngOnInit(): void {

    }

 public setDialog(title: string, content: string): void {
   this.dialogContent = content;
   this.dialogTitle = title;
 }

 onNoClick(): void {
   this.dialogRef.close(false);
 }

 onYesClick(): void {
   this.dialogRef.close(true);
 }


}
