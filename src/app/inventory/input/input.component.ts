import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { InventoryComponent } from '../inventory/inventory.component';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';

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

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;





  // // Viewchild for selects
  // @ViewChild('categoryselect') categoryselect!: ElementRef<HTMLInputElement>;
  // @ViewChild('subcategoryselect') subcategoryselect!: ElementRef<HTMLInputElement>;
  // @ViewChild('subsubcategoryselect') subsubcategoryselect!: ElementRef<HTMLInputElement>;
  // @ViewChild('itemtypeselect') itemtypeselect!: ElementRef<HTMLInputElement>;
  // @ViewChild('sizetypeselect') sizetypeselect!: ElementRef<HTMLInputElement>;
  // @ViewChild('instockselect') instockselect!: ElementRef<HTMLInputElement>;


  constructor(private sharedService: SharedService, private fb: FormBuilder, private inventoryService: InventoryService, private router: Router) {

    this.editedData = this.router.getCurrentNavigation()?.extras.state?.['data'];
    console.log('this.editedData: ', this.editedData);

  }

  ngOnInit(): void {


    this.getCategoriesList();
    this.getSubCategoriesList();
    this.getSubSubCategoriesList();


    // this.sharedService.loadScripts();
    this.addItemform = this.fb.group({
      'vendor': ['24'],
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
      'stock': [0],
      'in_stock': ['', Validators.required],
      'description': [''],
      'spiciness': ['Medium'],
      'chef_special': [false],
      "upcoming": [false],
      "rating": [4.5]


    })
  }


  getCategoriesList() {
    this.inventoryService.getCategories().subscribe((res: any) => {
      this.categoriesList = res.response;
    })

  }


  selectCatgeory(item: any) {
    this.selectedCategoryValue = item.name;
    this.selectedCategoryValueId = item.id;
    this.filterSubCategoriesList();
    this.selectedSubCategoryValue = 'Select'
  }


  getSubCategoriesList() {
    this.inventoryService.getSubCategories().subscribe((res: any) => {
      this.subCategoriesList = res.response;
    })

  }



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




  getSubSubCategoriesList() {
    this.inventoryService.getSubSubCategories().subscribe((res: any) => {
      this.subSubCategoriesList = res.response;
      console.log('this.subSubCategoriesList: ', this.subSubCategoriesList);
    })

  }



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
          this.sharedService.showSnackBar('Excel Uploaded Sucessfully','success')
          this.onFileCancel();

        },
        error: (err: any) => {
          this.sharedService.showSnackBar('Something went wrong','error')

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
      'category': this.selectedCategoryValueId,
      'sub_category': this.selectedSubCategoryValueId,
      'sub_sub_category': this.selectedSubSubCategoryValueId,
      'item_type': this.selectedItemType,
      'size_type': this.selectedSizeType,
      'in_stock': this.selectedStockStatus == 'Yes',
      'ingredients': this.tags

    })

    // this.categoryselect.nativeElement.value;
  }


  addItem() {
    this.patchSelectedValuesToForm();
    let formValue = this.addItemform.value;
    console.log('====', formValue);
    if (formValue.category == 'Select' || formValue.sub_category == 'Select' || formValue.item_type == 'Select' || formValue.in_stock == 'Select' || formValue.size_type == 'Select' || (formValue.size_type == 'Available' && (formValue.s_price == '' || formValue.m_price == '' || formValue.l_price == '')) || (formValue.size_type == 'NA' && formValue.price == '') || formValue.estimate_time == '' || formValue.ingredients.length == 0 || formValue.menu_item == '' || (formValue.in_stock == 'Yes' && formValue.stock == 0)) {
      this.sharedService.showSnackBar('Please Fill All Details', 'error');
    }
    else {
      console.log('devesh---');
      this.inventoryService.insertSingleItem(formValue).subscribe((res: any) => {
        console.log('res----', res);
      this.sharedService.showSnackBar('Items Add Succesfully', 'success');
      },
        (err: any) => {
          console.log('err----', err);
        })
    }










    // this.sharedService.insertInventoryMenuSingleEntryApi(this.addItemform.value).subscribe({
    //   next: (res: any) => {
    //     console.log('Res----', res);
    //   },
    //   error: (err: any) => {
    //     console.log('errror----', err);
    //   }
    // });

    // else {
    //   this.sharedService.showSnackBar('Please Fill All Details', 'error');
    // }


  }










}
