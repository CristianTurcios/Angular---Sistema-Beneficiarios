import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BecasComponent } from './becas.component';

describe('TablesComponent', () => {
  let component: BecasComponent;
  let fixture: ComponentFixture<BecasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BecasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
