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



  constructor(){
    
  }

  ngOnInit(): void {

  }


}
