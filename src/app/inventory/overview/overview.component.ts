import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  inventoryItemsData: any;
  categoriesList: any;
  subCategoriesList: any;
  subSubCategoriesList: any;
  deleteditem: any;

  constructor(private inventoryService: InventoryService, private sharedService: SharedService , private router:Router) { }

  ngOnInit(): void {


    this.getInventoryItemsData();



  }

  getInventoryItemsData() {
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



  editItem(item:any) {
    console.log('id----', item);
    // let obj={};
    // this.inventoryService.editMenuItem(obj).subscribe((res:any)=>{
    //   console.log();
    // })
    this.router.navigate(['/inventory/Input'],{state:{data:item}})

    
  }


  getDeletedItem(id: any) {
    this.deleteditem = id;
    console.log('deleted item', id);
  }

  deleteItem() {
    let obj = {
      'menu_item_ids': [this.deleteditem]
    }
    this.inventoryService.deleteMenuItem(obj).subscribe((res: any) => {
      this.sharedService.showSnackBar('Item Delete Succesfully', 'success')
      this.getInventoryItemsData()
    },
      (err: any) => {
        this.sharedService.showSnackBar('Something Went Wrong', 'Error')
      })
  }

  getCategoryName(id: any) {
    if (this.categoriesList)
      for (let item of this.categoriesList) {
        if (item.id == id)
          return item.name;
      }
    return 'NA';

  }
  getSubCategoryName(id: any) {

    if (this.subCategoriesList)
      for (let item of this.subCategoriesList) {
        if (item.id == id)
          return item.name;
      }
    return 'NA';

  }
  getSubSubCategoryName(id: any) {


    if (this.subSubCategoriesList)
      for (let item of this.subSubCategoriesList) {
        if (item.id == id)
          return item.name;
      }
    return 'NA';


  }








}
