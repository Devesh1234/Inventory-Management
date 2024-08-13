import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosViewComponent } from './photos-view.component';

describe('PhotosViewComponent', () => {
  let component: PhotosViewComponent;
  let fixture: ComponentFixture<PhotosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
