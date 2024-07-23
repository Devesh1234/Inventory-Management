import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppCommonModule } from 'src/app/app-common/app-common.module';

@Component({
  selector: 'app-inventory-preview',
  standalone: true,
  imports: [AppCommonModule, CommonModule],
  templateUrl: './inventory-preview.component.html',
  styleUrl: './inventory-preview.component.scss'
})
export class InventoryPreviewComponent implements OnInit {

  obj: any = [
    {
      "id": 258,
      "vendor": {
        "id": 30,
        "business_name": "New test",
        "business_branch": "Main",
        "registered_address": "B/112 Dwarka Street",
        "description": "",
        "timings": "",
        "capacity": null,
        "occupied": null,
        "parking": false,
        "alcohol_serve": false,
        "smoke_space": false,
        "delivery": false
      },
      "category": {
        "id": 22,
        "name": "Food",
        "created_at": "2024-07-13T11:27:33.935956Z",
        "vendor": 32
      },
      "sub_category": {
        "id": 16,
        "name": "Main Course",
        "category": 22,
        "created_at": "2024-07-13T12:07:46.768169Z",
        "vendor": null
      },
      "sub_sub_category": {
        "id": 28,
        "name": "Piz  za",
        "subcategory": 16,
        "created_at": "2024-07-13T12:07:46.781722Z",
        "vendor": null
      },
      "menu_item": "Margherita Pizza",
      "item_type": "Vegetarian",
      "description": "Traditional Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil leaves.",
      "ingredients": "['Flour', 'Tomato sauce', 'Mozzarella cheese', 'Basil']",
      "price": "800.00",
      "s_price": "0.00",
      "m_price": "0.00",
      "l_price": "0.00",
      "xl_price": "0.00",
      "size_type": "NA",
      "estimate_time": 30,
      "spiciness": "Medium",
      "calories": "300.00",
      "stock": 30,
      "in_stock": true,
      "chef_special": true,
      "upcoming": true,
      "image": "/media/nan",
      "rating": "4.20",
      "created_at": "2024-07-13T12:37:03Z"
    },

    {
      "id": 260,
      "vendor": {
        "id": 31,
        "business_name": "New test",
        "business_branch": "Main",
        "registered_address": "B/112 Dwarka Street",
        "description": "",
        "timings": "",
        "capacity": null,
        "occupied": null,
        "parking": false,
        "alcohol_serve": false,
        "smoke_space": false,
        "delivery": false
      },
      "category": {
        "id": 22,
        "name": "Food",
        "created_at": "2024-07-13T11:27:33.935956Z",
        "vendor": 31
      },
      "sub_category": {
        "id": 17,
        "name": "Main Course",
        "category": 22,
        "created_at": "2024-07-13T12:07:46.768169Z",
        "vendor": null
      },
      "sub_sub_category": {
        "id": 24,
        "name": "Pizza",
        "subcategory": 17,
        "created_at": "2024-07-13T12:07:46.781722Z",
        "vendor": null
      },
      "menu_item": "Margherita Pizza",
      "item_type": "Vegetarian",
      "description": "Traditional Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil leaves.",
      "ingredients": "['Flour', 'Tomato sauce', 'Mozzarella cheese', 'Basil']",
      "price": "800.00",
      "s_price": "0.00",
      "m_price": "0.00",
      "l_price": "0.00",
      "xl_price": "0.00",
      "size_type": "NA",
      "estimate_time": 30,
      "spiciness": "Medium",
      "calories": "300.00",
      "stock": 30,
      "in_stock": true,
      "chef_special": true,
      "upcoming": true,
      "image": "/media/nan",
      "rating": "4.20",
      "created_at": "2024-07-13T12:37:03Z"
    },

    {
      "id": 261,
      "vendor": {
        "id": 36,
        "business_name": "New test",
        "business_branch": "Main",
        "registered_address": "B/112 Dwarka Street",
        "description": "",
        "timings": "",
        "capacity": null,
        "occupied": null,
        "parking": false,
        "alcohol_serve": false,
        "smoke_space": false,
        "delivery": false
      },
      "category": {
        "id": 22,
        "name": "Food",
        "created_at": "2024-07-13T11:27:33.935956Z",
        "vendor": 31
      },
      "sub_category": {
        "id": 17,
        "name": "Main Course",
        "category": 22,
        "created_at": "2024-07-13T12:07:46.768169Z",
        "vendor": null
      },
      "sub_sub_category": {
        "id": 25,
        "name": "Pizza",
        "subcategory": 17,
        "created_at": "2024-07-13T12:07:46.781722Z",
        "vendor": null
      },
      "menu_item": "Margherita Pizza",
      "item_type": "Vegetarian",
      "description": "Traditional Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil leaves.",
      "ingredients": "['Flour', 'Tomato sauce', 'Mozzarella cheese', 'Basil']",
      "price": "800.00",
      "s_price": "0.00",
      "m_price": "0.00",
      "l_price": "0.00",
      "xl_price": "0.00",
      "size_type": "NA",
      "estimate_time": 30,
      "spiciness": "Medium",
      "calories": "300.00",
      "stock": 30,
      "in_stock": true,
      "chef_special": true,
      "upcoming": true,
      "image": "/media/nan",
      "rating": "4.20",
      "created_at": "2024-07-13T12:37:03Z"
    },

    {
      "id": 262,
      "vendor": {
        "id": 32,
        "business_name": "New test",
        "business_branch": "Main",
        "registered_address": "B/112 Dwarka Street",
        "description": "",
        "timings": "",
        "capacity": null,
        "occupied": null,
        "parking": false,
        "alcohol_serve": false,
        "smoke_space": false,
        "delivery": false
      },
      "category": {
        "id": 23,
        "name": "Food",
        "created_at": "2024-07-13T11:27:33.935956Z",
        "vendor": 33
      },
      "sub_category": {
        "id": 18,
        "name": "Main Course",
        "category": 23,
        "created_at": "2024-07-13T12:07:46.768169Z",
        "vendor": null
      },
      "sub_sub_category": {
        "id": 24,
        "name": "Pizza",
        "subcategory": 18,
        "created_at": "2024-07-13T12:07:46.781722Z",
        "vendor": null
      },
      "menu_item": "Margherita Pizza",
      "item_type": "Vegetarian",
      "description": "Traditional Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil leaves.",
      "ingredients": "['Flour', 'Tomato sauce', 'Mozzarella cheese', 'Basil']",
      "price": "800.00",
      "s_price": "0.00",
      "m_price": "0.00",
      "l_price": "0.00",
      "xl_price": "0.00",
      "size_type": "NA",
      "estimate_time": 30,
      "spiciness": "Medium",
      "calories": "300.00",
      "stock": 30,
      "in_stock": true,
      "chef_special": true,
      "upcoming": true,
      "image": "/media/nan",
      "rating": "4.20",
      "created_at": "2024-07-13T12:37:03Z"
    },

  ];


  constructor() {

  }

  new_obj:any;
  ngOnInit(): void {
    console.log('Devesh',this.obj);
    this.obj.forEach((element:any) => {
      // if(element.category)
        console.log(element.category.id);
    });




    const groupedItems = this.obj.reduce((acc:any, item:any) => {
      const categoryName = item.category.id;
      const subCategoryName = item.sub_category.id;
      const subSubCategoryName = item.sub_sub_category.id;
    
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
    }, {});
    
    console.log(groupedItems);
    console.log('Bhatia',groupedItems);







  }


}
 