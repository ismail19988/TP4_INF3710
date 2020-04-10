import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMovieAddingComponent } from './admin-movie-adding.component';

describe('AdminMovieAddingComponent', () => {
  let component: AdminMovieAddingComponent;
  let fixture: ComponentFixture<AdminMovieAddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMovieAddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMovieAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
