import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from '../../models/job';

@Component({
  selector: 'cf-delete-job-modal',
  templateUrl: './delete-job-modal.component.html',
  styleUrls: ['./delete-job-modal.component.scss']
})
export class DeleteJobModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Job) {
     }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  deleteJob(){
    this.dialogRef.close(true);
  }
}
