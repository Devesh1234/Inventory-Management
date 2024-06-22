import { Component, OnInit } from '@angular/core';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { HeaderComponent } from 'src/app/app-common/header/header.component';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [AppCommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  constructor(private sharedService:SharedService)
  {

  }
  ngOnInit(): void {
    this.sharedService.loadScripts();
  }


}
