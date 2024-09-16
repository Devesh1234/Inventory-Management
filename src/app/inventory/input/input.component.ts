import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { InventoryComponent } from '../inventory/inventory.component';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';
import { combineLatest, forkJoin, interval, merge, Observable, take } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {






  uploadedFile: File | null = null;
  addItemform: any;


  categoriesList: any;
  subCategoriesList: any;
  subSubCategoriesList: any;

  selectedCategoryValue: any = 'Select';
  selectedCategoryValueId: string = '';
  selectedSubCategoryValue: string = 'Select';
  selectedSubCategoryValueId: string = '';
  filteredSubCategoriesList: any;

  selectedSubSubCategoryValue: string = 'Select';
  selectedSubSubCategoryValueId: string = '';
  filteredSubSubCategoriesList: any;


  sizeTypeList: any = ['NA', 'Available'];
  selectedSizeType: any = 'Select'

  itemTypeList: any = ['Vegetarian', 'Non-Vegetarian'];
  selectedItemType: any = 'Select'


  stockStatusList: any = ['Yes', 'No'];
  selectedStockStatus: any = 'Select'

  editedData: any;
  isItemEditedData: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;





  // // Viewchild for selects
  // @ViewChild('categoryselect') categoryselect!: ElementRef<HTMLInputElement>;
  // @ViewChild('subcategoryselect') subcategoryselect!: ElementRef<HTMLInputElement>;
  // @ViewChild('subsubcategoryselect') subsubcategoryselect!: ElementRef<HTMLInputElement>;
  // @ViewChild('itemtypeselect') itemtypeselect!: ElementRef<HTMLInputElement>;
  // @ViewChild('sizetypeselect') sizetypeselect!: ElementRef<HTMLInputElement>;
  // @ViewChild('instockselect') instockselect!: ElementRef<HTMLInputElement>;


  constructor(private sharedService: SharedService, private fb: FormBuilder, private inventoryService: InventoryService, private router: Router, private location: Location) {






    // this.editedData = this.router.getCurrentNavigation()?.extras.state?.['data'];


  }

  ngOnInit(): void {

    this.sharedService.loadScripts();



    this.initializeForm();

    combineLatest([this.inventoryService.getCategories(), this.inventoryService.getSubCategories(), this.inventoryService.getSubSubCategories(), this.inventoryService.itemEditedData.asObservable()]).subscribe((resp: any) => {
      console.log('devesh-------', resp);
      this.categoriesList = resp[0].response;
      this.subCategoriesList = resp[1].response;
      this.subSubCategoriesList = resp[2].response;
      this.editedData = resp[3];
      console.log('this.editedData: ', this.editedData);
      if (Object.keys(this.editedData).length != 0) {
        this.isItemEditedData = true;
        this.patchEditedValues(this.editedData);

      }
    })





    // if (this.editedData!=null) {
    //   this.patchEditedValues(this.editedData);

    //   console.log('this.editedData: ', this.editedData);

    // }


    // this.sharedService.loadScripts();

  }


  // getCategoriesList() {
  //   this.inventoryService.getCategories().subscribe((res: any) => {
  //     this.categoriesList = res.response;
  //     console.log('this.categoriesList: ', this.categoriesList);
  //   })

  // }

  initializeForm() {

    this.addItemform = this.fb.group({
      'id': [''],
      'menu_item': ['', Validators.required],
      'category': ['', Validators.required],
      'sub_category': ['', Validators.required],
      'sub_sub_category': [''],
      'item_type': ['', Validators.required],
      'ingredients': [[], Validators.required],
      'size_type': ['', Validators.required],
      'price': ['', Validators.required],
      's_price': ['', Validators.required],
      'm_price': ['', Validators.required],
      'l_price': ['', Validators.required],
      'xl_price': ['', Validators.required],
      'estimate_time': ['', Validators.required],
      'calories': [''],
      'stock': [{ value: 0, disabled: true }],
      'in_stock': ['', Validators.required],
      'description': [''],
      'spiciness': ['Medium'],
      'chef_special': [false],
      "upcoming": [false],
      "rating": [4.5]


    })
  }

  selectCatgeory(item: any) {
    this.selectedCategoryValue = item.name;
    this.selectedCategoryValueId = item.id;
    this.filterSubCategoriesList();
    this.selectedSubCategoryValue = 'Select'
    this.selectedSubSubCategoryValue = 'Select'
  }


  // getSubCategoriesList() {
  //   this.inventoryService.getSubCategories().subscribe((res: any) => {
  //     this.subCategoriesList = res.response;
  //     console.log('this.subCategoriesList: ', this.subCategoriesList);
  //   })

  // }



  filterSubCategoriesList() {
    this.filteredSubCategoriesList = this.subCategoriesList.filter((elem: any) => {
      console.log('elem: ', elem);
      return elem.category == this.selectedCategoryValueId;

    });

    // console.log('this.filteredSubCategoriesList: ', this.filteredSubCategoriesList);

  }


  selectSubCatgeory(item: any) {
    this.selectedSubCategoryValue = item.name
    this.selectedSubCategoryValueId = item.id;
    this.filterSubSubCategoriesList();
    this.selectedSubSubCategoryValue = 'Select'

  }




  // getSubSubCategoriesList() {
  //   this.inventoryService.getSubSubCategories().subscribe((res: any) => {
  //     this.subSubCategoriesList = res.response;
  //     console.log('this.subSubCategoriesList: ', this.subSubCategoriesList);
  //   })

  // }



  filterSubSubCategoriesList() {
    this.filteredSubSubCategoriesList = this.subSubCategoriesList
      .filter((elem: any) => {
        console.log('elem: ', elem);
        return elem.subcategory == this.selectedSubCategoryValueId;

      });

    console.log('this.filteredSubSubCategoriesList: ', this.filteredSubSubCategoriesList);

  }

  selectSubSubCatgeory(item: any) {

    this.selectedSubSubCategoryValue = item.name
    this.selectedSubSubCategoryValueId = item.id

  }





  selectSizeType(size: any) {
    this.selectedSizeType = size;
  }


  selectItemType(item: any) {
    this.selectedItemType = item;
  }

  selectStockStatus(status: any) {
    this.selectedStockStatus = status;
    console.log('this.selectedStockStatus: ', this.selectedStockStatus);
    if (this.selectedStockStatus == "Yes") {
      this.addItemform.get('stock')?.enable();
    }
    else {
      this.addItemform.get('stock')?.disable();
      this.addItemform.get('stock').patchValue(0);

    }

  }









  tags: any = [];
  inputValue: string = '';




  removeTagItem(index: number) {
    this.tags.splice(index, 1);
  }




  addTag(event: any) {
    this.inputValue = event.target.value
    console.log('Devesh', event.target.value);
    if (this.inputValue && !this.tags.includes(this.inputValue)) {
      this.tags.push(this.inputValue);
      this.inputValue = '';
      event.target.value = "";
    }
  }





  itemImageFile: File | null = null;

  onItemImageSelected(event: any) {
    console.log('event---', event.target.files);
    this.itemImageFile = event.target.files[0];


  }



  onFileSelected(event: any) {
    console.log('event---', event.target.files);
    this.uploadedFile = event.target.files[0];
    console.log('this.uploadedFile: ', this.uploadedFile);


  }



  saveUploadFile() {
    if (this.uploadedFile != null) {
      this.inventoryService.insertExcelData(this.uploadedFile).subscribe({
        next: (res: any) => {
          console.log('Inventory Menun Excel Entry', res);
          this.sharedService.showSnackBar('Excel Uploaded Sucessfully', 'success')
          this.onFileCancel();

        },
        error: (err: any) => {
          this.sharedService.showSnackBar('Something went wrong', 'error')

        }
      });
    }
  }

  onFileCancel() {
    this.uploadedFile = null;
    this.fileInput.nativeElement.value = '';

  }

  excelDownload() {
    const fileUrl = '/assets/samplefile/sample_file.xlsx';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'filename.ext');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.sharedService.showSnackBar('Sample File Download ', 'success')

  }

  patchSelectedValuesToForm() {

    this.addItemform.patchValue({
      'category': this.selectedCategoryValue,
      'sub_category': this.selectedSubCategoryValue,
      'sub_sub_category': this.selectedSubSubCategoryValue == 'Select' ? '' : this.selectedSubSubCategoryValue,
      'item_type': this.selectedItemType,
      'size_type': this.selectedSizeType,
      'in_stock': this.selectedStockStatus == 'Yes',
      'ingredients': this.tags

    })

    // this.categoryselect.nativeElement.value;
  }


  patchEditedValues(data: any) {
    console.log('data: ', data);
    this.selectedCategoryValue = data.category
    this.selectedSubCategoryValue = data.sub_category
    this.selectedSubSubCategoryValue = data.sub_sub_category
    this.tags = data.ingredients;
    this.selectedSizeType = data.size_type.toLowerCase();
    this.selectedItemType = data.item_type;
    this.selectedStockStatus = data.in_stock ? 'Yes' : 'No';

    this.addItemform.patchValue({
      "id": data.id,
      "menu_item": data.menu_item,
      "category": data.category,
      "sub_category": data.sub_category,
      "sub_sub_category": data.sub_sub_category,
      "item_type": data.item_type,
      "description": data.description,
      "ingredients": data.ingredients,
      "size_type": data.size_type,
      "price": data.price,
      "s_price": data.s_price,
      "m_price": data.m_price,
      "l_price": data.l_price,
      "xl_price": data.xl_price,
      "estimate_time": data.estimate_time,
      // "spiciness": "Medium",
      "calories": data.calories,
      "stock": data.stock,
      "in_stock": data.in_stock,
      // "chef_special": false,
      // "upcoming": false,
      // "rating": "4.50",
      // "likes": []
    })


    console.log('form----', this.addItemform);
  }

  addItem() {

    this.patchSelectedValuesToForm();
    let formValue = this.addItemform.value;

    if (formValue.category == 'Select' || formValue.sub_category == 'Select' || formValue.item_type == 'Select' || formValue.in_stock == 'Select' || formValue.size_type == 'Select' || (formValue.size_type == 'Available' && (formValue.s_price == '' || formValue.m_price == '' || formValue.l_price == '')) || (formValue.size_type == 'NA' && formValue.price == '') || formValue.estimate_time == '' || formValue.ingredients.length == 0 || formValue.menu_item == '' || (formValue.in_stock == 'Yes' && formValue.stock == 0)) {
      this.sharedService.showSnackBar('Please Fill All Details', 'error');
    }
    else {
      if (this.isItemEditedData == true) {
        this.inventoryService.editMenuItem(formValue).subscribe((res: any) => {
          console.log('Ress-----', res);
        })
      }
      else {
        console.log('devesh---');
        this.inventoryService.insertSingleItem(formValue).subscribe((res: any) => {
          console.log('res----', res);
          this.sharedService.showSnackBar(res.message, 'success');
          this.router.navigate(['/inventory/items-overview'], { replaceUrl: true })


        },
          (err: any) => {
            console.log('err----', err);
          })
      }
    }



    // if (this.editedData) {

    //   console.log('Ress--', this.addItemform.value);
    // }
    // else {
    //   this.patchSelectedValuesToForm();
    //   let formValue = this.addItemform.value;
    //   console.log('====', formValue);



    // }
  }

  addNewItem() {
    this.ngOnInit();
    console.log('devesh=========');
    this.inventoryService.itemEditedData.next({});
    this.isItemEditedData = false;

    // this.tags=[]

    this.router.navigate(['/inventory/items-input']);

    window.location.reload();




  }


  onCancel() {
    if (Object.keys(this.editedData).length != 0) {
      this.router.navigate(['/inventory/items-overview'], { replaceUrl: true })

      this.inventoryService.itemEditedData.next({});
      this.isItemEditedData = false;
    }
  }




}

