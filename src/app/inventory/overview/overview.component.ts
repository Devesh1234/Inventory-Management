import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  inventoryMenuData: any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.loadScripts();


    this.sharedService.getInventoryMenuDataApi().subscribe((res: any) => {
      this.inventoryMenuData = res
      console.log('Get Inventory Menu Data ', this.inventoryMenuData);
    })

    

  }









}
