import { Component, OnInit } from '@angular/core';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';
import { InventoryService } from '../inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [AppCommonModule, CommonModule],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss'
})
export class SubcategoryComponent implements OnInit {
  selectedCategoryValue: string = 'Select';
  categoryList: any = ['Category1', 'Category2', 'Category3', 'Category4', 'Category5'];
  constructor(private sharedService: SharedService, private inventoryService: InventoryService) {

  }
  ngOnInit(): void {
    this.sharedService.loadScripts();

  }
  selectCatgeory(item: any) {

    this.selectedCategoryValue = item;
  }

}
