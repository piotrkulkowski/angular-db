import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OknoComponent } from './okno.component';

describe('OknoComponent', () => {
  let component: OknoComponent;
  let fixture: ComponentFixture<OknoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OknoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OknoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
