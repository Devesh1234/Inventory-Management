import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPreviewComponent } from './inventory-preview.component';

describe('InventoryPreviewComponent', () => {
  let component: InventoryPreviewComponent;
  let fixture: ComponentFixture<InventoryPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
