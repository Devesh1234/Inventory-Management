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
  inventoryItemsDataCopy: any;
  categoriesList: any;
  subCategoriesList: any;
  subSubCategoriesList: any;
  deleteditem: any;

  itemSearchValue: string = '';
  filterActive: boolean = false;


  selectedCategoryValue: string = 'Select';
  selectedCategoryValueId: string = '';
  selectedSubCategoryValue: string = 'Select';
  selectedSubCategoryValueId: string = '';
  selectedSubSubCategoryValue: string = 'Select';
  selectedSubSubCategoryValueId: string = '';

  filteredSubCategoriesList: any;
  filteredSubSubCategoriesList: any;







  constructor(private inventoryService: InventoryService, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {


    this.getInventoryItemsData();



  }

  getInventoryItemsData() {
    this.inventoryService.getInventoryItemsData().subscribe((res: any) => {
      this.inventoryItemsData = this.inventoryItemsDataCopy = res.response
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



  editItem(item: any) {
    console.log('id----', item);
    // let obj={};
    // this.inventoryService.editMenuItem(obj).subscribe((res:any)=>{
    //   console.log();
    // })
    this.router.navigate(['/inventory/Input'], { state: { data: item } })


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

  getCategoryName(cat: any) {
    if (this.categoriesList)
      for (let item of this.categoriesList) {
        if (item.id == cat)
          return item.name;
      }
    return 'NA';

  }
  getSubCategoryName(subcat: any) {

    if (this.subCategoriesList)
      for (let item of this.subCategoriesList) {
        if (item.id == subcat)
          return item.name;
      }
    return 'NA';

  }
  getSubSubCategoryName(subsubcat: any) {


    if (this.subSubCategoriesList)
      for (let item of this.subSubCategoriesList) {
        if (item.id == subsubcat)
          return item.name;
      }
    return 'NA';


  }


  onInputChange(e: any) {
    console.log(e.target.value);

    let val = e.target.value.toString().toLowerCase();
    console.log('val: ', val);
    this.inventoryItemsData = this.inventoryItemsDataCopy.filter((ele: any) => {
      return ele.menu_item.toString().toLowerCase().includes(val)

    })
  }


  filterItems() {

    this.filterActive = !this.filterActive;
    this.inventoryItemsData = this.inventoryItemsDataCopy;
    this.selectedCategoryValue = 'Select';


  }



  selectCatgeory(item: any) {
    this.selectedCategoryValue = item.name;
    this.selectedCategoryValueId = item.id;
    this.filterSubCategoriesList();
    this.selectedSubCategoryValue = 'Select'

    this.inventoryItemsData = this.inventoryItemsDataCopy.filter((ele: any) => {
      if (ele.category == item.id)
        return ele;
    })
  }




  filterSubCategoriesList() {
    this.filteredSubCategoriesList = this.subCategoriesList.filter((elem: any) => {
      console.log('elem: ', elem);
      return elem.category == this.selectedCategoryValueId;

    });

    console.log('this.filteredSubCategoriesList: ', this.filteredSubCategoriesList);

  }


  selectSubCatgeory(item: any) {
    this.selectedSubCategoryValue = item.name;
    this.selectedSubCategoryValueId = item.id;
    this.filterSubSubCategoriesList();
    this.inventoryItemsData = this.inventoryItemsDataCopy.filter((ele: any) => {
      if (ele.sub_category.id == item.id)
        return ele;
    })

  }

  filterSubSubCategoriesList() {
    this.filteredSubSubCategoriesList = this.subSubCategoriesList.filter((elem: any) => {
      console.log('elem: ', elem);
      return elem.subcategory == this.selectedSubCategoryValueId;

    });

    console.log('this.filteredSubCategoriesList============: ', this.filteredSubSubCategoriesList);

  }


  selectSubSubCategory(item: any) {
    this.selectedSubSubCategoryValue = item.name;
    this.selectedSubSubCategoryValueId = item.id;
    this.inventoryItemsData = this.inventoryItemsDataCopy.filter((ele: any) => {
      if (ele.sub_sub_category.id == item.id)
        return ele;
    })
  }






}
