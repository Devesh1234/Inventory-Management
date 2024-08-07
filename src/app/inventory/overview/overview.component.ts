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
  categoriesList:any;
  subCategoriesList:any;
  subSubCategoriesList:any;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {


    this.inventoryService.getInventoryItemsData().subscribe((res: any) => {
      this.inventoryItemsData = res
      console.log('======', this.inventoryItemsData);
    this.getCategroiesList();
    this.getSubCategoriesList();
    this.getSubSubCategoriesList();
    })

    

  }


  getCategroiesList() {
    this.inventoryService.getCategories().subscribe((res: any) => {
      console.log('this.categoriesList: ', res);


      this.categoriesList = res.response;
      console.log('this.categoriesList: ', this.categoriesList);
    })

  }

  getSubCategoriesList() {
    this.inventoryService.getSubCategories().subscribe((res: any) => {
      this.subCategoriesList = res.response;
      // console.log('this.subcategoriesList: ', this.subcategoriesList);

    })
  }

  getSubSubCategoriesList() {
    this.inventoryService.getSubSubCategories().subscribe((res: any) => {
      this.subSubCategoriesList = res.response;
      console.log('this.subSubcategoriesList: ', this.subSubCategoriesList);

    })
  }



  editItem(id:any){
    console.log('id----',id);
  }
  

  getDeletedItem(id: any) {
    // this.deleteditem = id;
    // console.log('deleted item', id);
  }
  deleteItem() {
    // this.acceptOrNot(false, this.deleteditem)
  }

  getCategoryName(id:any){
    if(this.categoriesList)
    for(let item of this.categoriesList){
      if(item.id==id)
        return item.name;
    }
    return 'NA';

  }
  getSubCategoryName(id:any){

    if(this.subCategoriesList)
      for(let item of this.subCategoriesList){
        if(item.id==id)
          return item.name;
      }
      return 'NA';

  }
  getSubSubCategoryName(id:any){


    if(this.subSubCategoriesList)
      for(let item of this.subSubCategoriesList){
        if(item.id==id)
          return item.name;
      }
      return 'NA';


  }








}
