import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscapacitadoComponent } from './discapacitado.component';

describe('DiscapacitadoComponent', () => {
  let component: DiscapacitadoComponent;
  let fixture: ComponentFixture<DiscapacitadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscapacitadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscapacitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
