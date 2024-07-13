import { Component, OnInit } from '@angular/core';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { HeaderComponent } from 'src/app/app-common/header/header.component';
import { SharedService } from 'src/app/shared.service';
import { InventoryService } from '../inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [AppCommonModule,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categoryList: any;
  categoryValue:string='';

  constructor(private sharedService: SharedService, private inventoryService: InventoryService) {


  }
  ngOnInit(): void {
    this.sharedService.loadScripts();
    this.getCategoriesList();
  }


  
  onInputChange(e: any) {
    console.log("devesh", e.target.value);
    this.categoryValue = e.target.value;

  }


  getCategoriesList() {

    this.inventoryService.getCategories().subscribe({
      next: (res: any) => {
        console.log('Category res--: ', res);
        
        if (res && res.response) {
          this.categoryList = res.response;
          console.log(res);

        }
        else {

        }
      },
      error: (err: any) => {
        console.log('err: ', err);

      }
    })
  }

  
  onSubmit() {
    let obj = { "name": this.categoryValue}
    this.inventoryService.setCategory(obj).subscribe({
      next: (res: any) => {
        console.log(res);
        if(res && res.status=='success')
          {
            this.sharedService.showSnackBar('Category Added Succesful','success');

            this.ngOnInit();
            this.categoryValue='';
            
          }
      },
      error: (res: any) => {

      }
    })
  }

  onCancel()
  {
    this.categoryValue='';
  }



}
