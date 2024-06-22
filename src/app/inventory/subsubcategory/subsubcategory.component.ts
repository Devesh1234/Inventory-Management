import { Component, OnInit } from '@angular/core';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-subsubcategory',
  standalone: true,
  imports: [AppCommonModule],
  templateUrl: './subsubcategory.component.html',
  styleUrl: './subsubcategory.component.scss'
})
export class SubsubcategoryComponent implements OnInit {
  constructor(private sharedService: SharedService) {

  }
  ngOnInit(): void {
    this.sharedService.loadScripts();
  }

}
