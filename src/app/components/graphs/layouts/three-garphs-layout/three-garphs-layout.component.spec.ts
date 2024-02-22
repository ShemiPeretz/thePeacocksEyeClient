import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGarphsLayoutComponent } from './three-garphs-layout.component';

describe('ThreeGarphsLayoutComponent', () => {
  let component: ThreeGarphsLayoutComponent;
  let fixture: ComponentFixture<ThreeGarphsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeGarphsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreeGarphsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
