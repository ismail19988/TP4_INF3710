import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMemberAddingComponent } from './admin-member-adding.component';

describe('AdminMemberAddingComponent', () => {
  let component: AdminMemberAddingComponent;
  let fixture: ComponentFixture<AdminMemberAddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMemberAddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMemberAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
