import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarIconComponent } from './snack-bar-icon.component';

describe('SnackBarIconComponent', () => {
  let component: SnackBarIconComponent;
  let fixture: ComponentFixture<SnackBarIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
