import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  inventoryItemsData: any;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {


    this.inventoryService.getInventoryItemsData().subscribe((res: any) => {
      this.inventoryItemsData = res
      console.log('======', this.inventoryItemsData);
    })

    

  }









}
