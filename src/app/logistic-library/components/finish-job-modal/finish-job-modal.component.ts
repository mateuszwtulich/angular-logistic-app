import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Job } from '../../models/job';

@Component({
  selector: 'cf-finish-job-modal',
  templateUrl: './finish-job-modal.component.html',
  styleUrls: ['./finish-job-modal.component.scss']
})
export class FinishJobModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FinishJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Job) {
     }

  ngOnInit() {
    console.log(this.data);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  finishJob(){
    this.dialogRef.close(true);
  }
}
