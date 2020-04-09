import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMoviesViewComponent } from './admin-movies-view.component';

describe('AdminMoviesViewComponent', () => {
  let component: AdminMoviesViewComponent;
  let fixture: ComponentFixture<AdminMoviesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMoviesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMoviesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
