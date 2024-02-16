import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  snackMessage: string = '';
  snackAction: string = '';
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

    this.sharedService.getSnackBarStatus().subscribe((res: any) => {
      this.snackMessage = res.message;
      this.snackAction = res.action;
      let snackBar = document.getElementById('snackbar');
      if (this.snackMessage != '' && this.snackAction != '' && snackBar != null) {
        console.log('this.snackMessage', this.snackMessage)
        if (this.snackAction == 'success')
          snackBar.className = "snackbar success";
        if (this.snackAction == 'error')
          snackBar.className = "snackbar error";

      }
      setTimeout(() => {
        this.snackMessage = '';
        this.snackAction = '';
        if (snackBar != null)
          snackBar.className = 'snackbar'
      }, 2700)
    })
  }



}
