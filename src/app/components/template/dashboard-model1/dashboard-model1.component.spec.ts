import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardModel1Component } from './dashboard-model1.component';

describe('DashboardModel1Component', () => {
  let component: DashboardModel1Component;
  let fixture: ComponentFixture<DashboardModel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardModel1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardModel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
