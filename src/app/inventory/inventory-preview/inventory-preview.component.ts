import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { InventoryService } from '../inventory.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-inventory-preview',
  standalone: true,
  imports: [AppCommonModule, CommonModule],
  templateUrl: './inventory-preview.component.html',
  styleUrl: './inventory-preview.component.scss'
})
export class InventoryPreviewComponent implements OnInit {



  sample_object: any = {
    "24": {
      "23": {
        "34": [
          {
            "id": 273,
            "ingredients": [
              "[",
              "'",
              "R",
              "o",
              "m",
              "a",
              "i",
              "n",
              "e",
              " ",
              "l",
              "e",
              "t",
              "t",
              "u",
              "c",
              "e",
              "'",
              ",",
              " ",
              "'",
              "C",
              "r",
              "o",
              "u",
              "t",
              "o",
              "n",
              "s",
              "'",
              ",",
              " ",
              "'",
              "P",
              "a",
              "r",
              "m",
              "e",
              "s",
              "a",
              "n",
              " ",
              "c",
              "h",
              "e",
              "e",
              "s",
              "e",
              "'",
              ",",
              " ",
              "'",
              "C",
              "a",
              "e",
              "s",
              "a",
              "r",
              " ",
              "d",
              "r",
              "e",
              "s",
              "s",
              "i",
              "n",
              "g",
              "'",
              "]"
            ],
            "category": {
              "id": 24,
              "name": "Salad",
              "created_at": "2024-07-13T11:27:55.054329Z",
              "vendor": 32
            },
            "sub_category": {
              "id": 23,
              "name": "nan",
              "created_at": "2024-07-18T18:50:01.813599Z",
              "category": 24,
              "vendor": null
            },
            "sub_sub_category": {
              "id": 34,
              "name": "",
              "created_at": "2024-07-18T18:50:02.009765Z",
              "subcategory": 23,
              "vendor": null
            },
            "menu_item": "Vegetarian",
            "item_type": "Vegetarian",
            "description": "Classic Caesar salad with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.",
            "price": null,
            "s_price": "0.00",
            "m_price": "0.00",
            "l_price": "0.00",
            "xl_price": "0.00",
            "size_type": "nan",
            "estimate_time": 20,
            "spiciness": "Medium",
            "calories": "200.00",
            "stock": 20,
            "in_stock": true,
            "chef_special": true,
            "upcoming": true,
            "rating": "4.40",
            "created_at": "2024-07-18T18:50:02.073673Z",
            "vendor": 30
          }
        ]
      }
    }
  }

  obj: any;
  new_obj: any;

  categoriesList: any;
  subcategoriesList: any;
  subSubcategoriesList: any;




  constructor(private inventoryService: InventoryService) {

  }

  ngOnInit(): void {
    this.getCategroiesList();
    this.getSubCategoriesList();
    this.getSubSubCategoriesList();
    this.getInventoryItemsData();
    console.log('Devesh', this.obj);






    // let myData = this.transformMenuData(this.new_obj);
    // console.log('myData: ', myData);





  }


  groupItems() {

    const groupedItems = this.obj.reduce((acc: any, item: any) => {
      const categoryName = item.category;
      const subCategoryName = item.sub_category;
      const subSubCategoryName = item.sub_sub_category;

      if (!acc[categoryName]) {
        acc[categoryName] = {};
      }
      if (!acc[categoryName][subCategoryName]) {
        acc[categoryName][subCategoryName] = {};
      }
      if (!acc[categoryName][subCategoryName][subSubCategoryName]) {
        acc[categoryName][subCategoryName][subSubCategoryName] = [];
      }
      acc[categoryName][subCategoryName][subSubCategoryName].push(item);
      return acc;
    }, {})


    this.new_obj = groupedItems;
    console.log('this.new_obj: ', this.new_obj);

  }

  getInventoryItemsData() {
    this.inventoryService.getInventoryItemsData().subscribe((res: any) => {
      this.obj = res.response;
      console.log('======', this.obj);

      this.groupItems();
      // this.getCategroiesList();
      // this.getSubCategoriesList();
      // this.getSubSubCategoriesList();
    })
  }


  getCategroiesList() {
    this.inventoryService.getCategories().subscribe((res: any) => {
      // console.log('this.categoriesList: ', res);


      this.categoriesList = res.response;
      // console.log('this.categoriesList: ', this.categoriesList);
    })

  }

  getSubCategoriesList() {
    this.inventoryService.getSubCategories().subscribe((res: any) => {
      this.subcategoriesList = res.response;
      // console.log('this.subcategoriesList: ', this.subcategoriesList);

    })
  }

  getSubSubCategoriesList() {
    this.inventoryService.getSubSubCategories().subscribe((res: any) => {
      this.subSubcategoriesList = res.response;
      console.log('this.subSubcategoriesList: ', this.subSubcategoriesList);

    })
  }


  getCategoryName(item: any) {
    if (this.categoriesList)
      for (let elem of this.categoriesList) {
        // console.log('=======', elem);
        if (elem.id == item) {
          return elem.name

        }

      }


    return 'Devesh';
  }

  getSubCategoryName(item: any) {
    if (this.subcategoriesList)
      for (let elem of this.subcategoriesList) {
        // console.log('------- ', elem);
        if (elem.id == item)
          return elem.name

      }
    return 'Bhatia'

  }



  getSubSubCategoryName(item: any) {
    if (this.subSubcategoriesList)
      for (let elem of this.subSubcategoriesList) {
        // console.log('------- ', elem);
        if (elem.id == item)
          return elem.name

      }
    return 'Bhatias'
  }



  transformMenuData(data: any): any[] {
    const result = [];
    for (const catKey in data) {
      if (data.hasOwnProperty(catKey)) {
        for (const subCatKey in data[catKey]) {
          if (data[catKey].hasOwnProperty(subCatKey)) {
            for (const subSubCatKey in data[catKey][subCatKey]) {
              if (data[catKey][subCatKey].hasOwnProperty(subSubCatKey)) {
                result.push({
                  category: catKey,
                  subCategory: subCatKey,
                  subSubCategory: subSubCatKey,
                  items: data[catKey][subCatKey][subSubCatKey]
                });
              }
            }
          }
        }
      }
    }
    return result;
  }




}
