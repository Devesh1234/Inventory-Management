import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  inventoryItemsData: any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.loadScripts();


    this.sharedService.getInventoryItemsData().subscribe((res: any) => {
      this.inventoryItemsData = res
      console.log('======', this.inventoryItemsData);
    })

    

  }









}
