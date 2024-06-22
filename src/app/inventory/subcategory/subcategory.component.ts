import { Component, OnInit } from '@angular/core';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [AppCommonModule],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss'
})
export class SubcategoryComponent implements OnInit {
  constructor(private sharedService:SharedService)
  {

  }
  ngOnInit(): void {
    this.sharedService.loadScripts();

  }

}
