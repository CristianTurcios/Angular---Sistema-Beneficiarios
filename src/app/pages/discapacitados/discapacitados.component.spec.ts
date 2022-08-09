import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscapacitadosComponent } from './discapacitados.component';

describe('TablesComponent', () => {
  let component: DiscapacitadosComponent;
  let fixture: ComponentFixture<DiscapacitadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscapacitadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscapacitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
