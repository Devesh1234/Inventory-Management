import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { InventoryComponent } from '../inventory/inventory.component';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {




  tags: any = ['HTML', 'CSS', 'Javascript']


  uploadedFile: File | null = null;
  addItemform: any;
  categoriesList: any;
  subCategoriesList: any;
  subSubCategoriesList: any;

  selectedCategoryValue: any = 'Selected';
  selectedCategoryValueId: string = '';
  selectedSubCategoryValue: string = 'Select';
  selectedSubCategoryValueId: string = '';
  filteredSubCategoriesList: any;

  selectedSubSubCategoryValue: string = 'Select';
  selectedSubSubCategoryValueId: string = '';
  filteredSubSubCategoriesList: any;


  sizeTypeList: any = ['NA', 'Available'];
  selectedSizeType: any = 'Select'





  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Viewchild for selects
  @ViewChild('categoryselect') categoryselect!: ElementRef<HTMLInputElement>;
  @ViewChild('subcategoryselect') subcategoryselect!: ElementRef<HTMLInputElement>;
  @ViewChild('subsubcategoryselect') subsubcategoryselect!: ElementRef<HTMLInputElement>;
  @ViewChild('itemtypeselect') itemtypeselect!: ElementRef<HTMLInputElement>;
  @ViewChild('sizetypeselect') sizetypeselect!: ElementRef<HTMLInputElement>;
  @ViewChild('instockselect') instockselect!: ElementRef<HTMLInputElement>;


  constructor(private sharedService: SharedService, private fb: FormBuilder, private inventoryService: InventoryService) { }

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
      'sub_sub_category': ['', Validators.required],
      'item_type': ['', Validators.required],
      'ingredients': ['', Validators.required],
      'price': ['', Validators.required],
      'size_type': ['', Validators.required],
      's_price': ['', Validators.required],
      'm_price': ['', Validators.required],
      'l_price': ['', Validators.required],
      'estimate_time': ['', Validators.required],
      'calories': ['', Validators.required],
      'stock': ['', Validators.required],
      'in_stock': ['', Validators.required],
      'description': ['', Validators.required]
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



  ul:any = document.querySelector('.tags-input ul');
  input = document.querySelector('.tags-input input');
  deleteAll = document.querySelector('.removeAll button');


  onKeypress($event: any) {
    console.log('event---', $event);
    let value = $event.target.value;
    if ($event.key == 'Enter') {
      if (!this.tags.includes(value)) {

        this.tags.push(value);

        this.showTags();
      }
    }
  }

  showTags() {
    this.tags.forEach((value: any, key: any) => {
      let newLi = document.createElement('li');
      newLi.innerText = value;
      let newRemove = document.createElement('div');
      newRemove.classList.add('remove');
      newRemove.setAttribute('onclick', `this.removeItem(key)`);
      newLi.appendChild(newRemove);
      this.ul.appendChild(newLi)
    });
  }
  removeItem(key: any) {
    delete this.tags[key];
    this.showTags();
  }


  onFileSelected(event: any) {
    console.log('event---', event.target.files);
    this.uploadedFile = event.target.files[0];

  }

  saveUploadFile() {
    if (this.uploadedFile != null) {
      this.sharedService.insertInventoryMenuExcelEntryApi(this.uploadedFile).subscribe({
        next: (res: any) => {
          console.log('Inventory Menun Excel Entry', res);

        },
        error: (err: any) => {

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
      'category': this.categoryselect.nativeElement.value,
      'sub_category': this.subcategoryselect.nativeElement.value,
      'sub_sub_category': this.subsubcategoryselect.nativeElement.value,
      'item_type': this.itemtypeselect.nativeElement.value,
      'size_type': this.sizetypeselect.nativeElement.value,
      'in_stock': this.instockselect.nativeElement.value

    })

    // this.categoryselect.nativeElement.value;
  }


  addItem() {
    debugger;
    this.patchSelectedValuesToForm();

    if (this.addItemform.valid) {
      console.log(this.addItemform);
    }










    // this.sharedService.insertInventoryMenuSingleEntryApi(this.addItemform.value).subscribe({
    //   next: (res: any) => {
    //     console.log('Res----', res);
    //   },
    //   error: (err: any) => {
    //     console.log('errror----', err);
    //   }
    // });

    else {
      this.sharedService.showSnackBar('Please Fill All Details', 'error');
    }


  }




}
