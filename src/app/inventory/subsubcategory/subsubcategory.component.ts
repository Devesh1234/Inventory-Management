import { Component, OnInit } from '@angular/core';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';
import { InventoryService } from '../inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subsubcategory',
  standalone: true,
  imports: [AppCommonModule,CommonModule],
  templateUrl: './subsubcategory.component.html',
  styleUrl: './subsubcategory.component.scss'
})
export class SubsubcategoryComponent implements OnInit {

  subSubCategoryValue:string='';
  selectedCategoryValue: string = 'Select';
  selectedCategoryValueId: string = '';
  selectedSubCategoryValue: string = 'Select';
  selectedSubCategoryValueId: string = '';
  categoryList: any;
  subCategoriesList: any;
  filteredSubCategoriesList: any;
  subSubSubCategoriesList:any;



  constructor(private sharedService: SharedService, private inventoryService: InventoryService) {


  }
  ngOnInit(): void {
    this.sharedService.loadScripts();
    this.getCategoriesList();
    this.getSubCategoriesList();
    this.getSubSubCategoriesList();
  }



  
  onInputChange(e: any) {
    console.log("devesh", e.target.value);
    this.subSubCategoryValue = e.target.value;

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
          console.log('subcategories',res);

        }
        else {

        }
      },
      error: (err: any) => {

      }
    })
  }








  getSubSubCategoriesList() {

    this.inventoryService.getSubSubCategories().subscribe({
      next: (res: any) => {
        if (res && res.response) {
          this.subSubSubCategoriesList = res.response;
          console.log('subsubcategories',res);

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
    this.filterSubCategoriesList();
    this.selectedSubCategoryValue='Select'
  }


  filterSubCategoriesList()
  {
    this.filteredSubCategoriesList=this.subCategoriesList.filter((elem:any)=>{
      console.log('elem: ', elem);
      return elem.category==this.selectedCategoryValueId;

    });

    console.log('this.filteredSubCategoriesList: ', this.filteredSubCategoriesList);

  }


  selectSubCatgeory(item:any)
  {
    console.log('item: ', item);
    this.selectedSubCategoryValue=item.name;
    this.selectedSubCategoryValueId=item.id
  }

  
  onSubmit() {
    let obj = { "name": this.subSubCategoryValue, "subcategory": this.selectedSubCategoryValueId }
    this.inventoryService.setSubSubCategory(obj).subscribe({
      next: (res: any) => {
        console.log(res);
        if(res && res.status=='success')
          {
            this.sharedService.showSnackBar('SubCategory Added Succesful','success');

            this.ngOnInit();
            this.selectedCategoryValue='Select';
            this.selectedSubCategoryValue='Select';
            this.subSubCategoryValue='';
            // this.subCategoryValue='';

            
          }
      },
      error: (res: any) => {

      }
    })
  }

  
  onCancel()
  {
    this.selectedCategoryValue='Select';
    // this.subCategoryValue='';
  }


}
