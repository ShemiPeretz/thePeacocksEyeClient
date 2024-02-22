import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourGarphsLayoutComponent } from './four-garphs-layout.component';

describe('FourGarphsLayoutComponent', () => {
  let component: FourGarphsLayoutComponent;
  let fixture: ComponentFixture<FourGarphsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FourGarphsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FourGarphsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
