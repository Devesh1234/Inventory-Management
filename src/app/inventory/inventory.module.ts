import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory/inventory.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverviewComponent } from './overview/overview.component';
import { InputComponent } from './input/input.component';
import { OffersComponent } from './offers/offers.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SubsubcategoryComponent } from './subsubcategory/subsubcategory.component';
import { InventoryPreviewComponent } from './inventory-preview/inventory-preview.component';
import { NumbersOnlyDirective } from '../core/directives/numbers-only.directive';


const routes:Routes=[
  {path:'Inventory',component:InventoryComponent},
  {path:'Overview',component:OverviewComponent},
  {path:'Input',component:InputComponent},
  {path:'Offers',component:OffersComponent},
  {path:'category',component:CategoryComponent},
  {path:'subcategory',component:SubcategoryComponent},
  {path:'subsubcategory',component:SubsubcategoryComponent},
  {path:'inventoryPreview',component:InventoryPreviewComponent}
]

@NgModule({
  declarations: [
    InventoryComponent,
    OverviewComponent,
    InputComponent,
    OffersComponent,
    NumbersOnlyDirective
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class InventoryModule { }
