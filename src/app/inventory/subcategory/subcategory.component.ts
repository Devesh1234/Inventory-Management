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
  selectedCategoryValueId: string = '';
  subCategoryValue: string = '';
  categoryList: any;
  subCategoriesList: any;

  constructor(private sharedService: SharedService, private inventoryService: InventoryService) {

  }
  ngOnInit(): void {
    this.sharedService.loadScripts();

    this.getCategoriesList();
    this.getSubCategoriesList();


  }



  onInputChange(e: any) {
    console.log("devesh", e.target.value);
    this.subCategoryValue = e.target.value;

  }


  getCategoriesList() {

    this.inventoryService.getCategories().subscribe({
      next: (res: any) => {
        if (res && res.response) {
          this.categoryList = res.response;
          console.log(res);

        }
        else {

        }
      },
      error: (err: any) => {

      }
    })
  }



  getSubCategoriesList() {

    this.inventoryService.getSubCategories().subscribe({
      next: (res: any) => {
        if (res && res.response) {
          this.subCategoriesList = res.response;
          console.log(res);

        }
        else {

        }
      },
      error: (err: any) => {

      }
    })
  }

  
  selectCatgeory(item: any) {

    this.selectedCategoryValue = item.name;
    this.selectedCategoryValueId = item.id;

  }


  onSubmit() {
    let obj = { "name": this.subCategoryValue, "category": this.selectedCategoryValueId }
    this.inventoryService.setSubCategory(obj).subscribe({
      next: (res: any) => {
        console.log(res);
        if(res && res.status=='success')
          {
            this.sharedService.showSnackBar('SubCategory Added Succesful','success');

            this.ngOnInit();
            this.selectedCategoryValue='Select';
            this.subCategoryValue='';
            
          }
      },
      error: (res: any) => {

      }
    })
  }

  
  onCancel()
  {
    this.selectedCategoryValue='Select';
    this.subCategoryValue='';
  }
}
