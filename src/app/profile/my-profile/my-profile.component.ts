import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from 'src/app/app-common/app-common.module';
import { SharedService } from 'src/app/shared.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [AppCommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {

  sharedService = inject(SharedService);
  profileService = inject(ProfileService);

  profileForm: any;

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.sharedService.loadScripts();

    this.profileForm = this.fb.group({
      mobile_no: new FormControl('987161'),
      password: new FormControl('askdask')
    })


    this.profileForm.get('password').valueChanges.subscribe((value:any) => {
      console.log('Password Changed:', value);
    });
  }


  onFileSelected(event:any){
console.log('e----',event);
  }



  onUpdate() {

  }


  profileUpdate() {
    this.profileService.myProfileUpdate({}).subscribe((res: any) => {

    })
  }

}
