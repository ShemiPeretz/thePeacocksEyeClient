import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrl: './popup-message.component.scss'
})
export class PopupMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title:string,message: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
