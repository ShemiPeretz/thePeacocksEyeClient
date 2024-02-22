import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoGarphsLayoutComponent } from './two-garphs-layout.component';

describe('TwoGarphsLayoutComponent', () => {
  let component: TwoGarphsLayoutComponent;
  let fixture: ComponentFixture<TwoGarphsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoGarphsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwoGarphsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
