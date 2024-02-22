import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveGarphsLayoutComponent } from './five-garphs-layout.component';

describe('FiveGarphsLayoutComponent', () => {
  let component: FiveGarphsLayoutComponent;
  let fixture: ComponentFixture<FiveGarphsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiveGarphsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiveGarphsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
