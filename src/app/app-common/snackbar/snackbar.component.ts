import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  snackStatus: boolean = false;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

    this.sharedService.getSnackBarStatus().subscribe((res: any) => {
      this.snackStatus = true;
      setTimeout(() => {
        this.snackStatus = false;
      }, 2700)
    })
  }



}
