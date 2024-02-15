import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory/inventory.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverviewComponent } from './overview/overview.component';
import { InputComponent } from './input/input.component';
import { OffersComponent } from './offers/offers.component';


const routes:Routes=[
  {path:'Inventory',component:InventoryComponent},
  {path:'Overview',component:OverviewComponent},
  {path:'Input',component:InputComponent},
  {path:'Offers',component:OffersComponent}
]

@NgModule({
  declarations: [
    InventoryComponent,
    OverviewComponent,
    InputComponent,
    OffersComponent
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
