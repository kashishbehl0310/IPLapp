import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysmatchComponent } from './todaysmatch.component';

describe('TodaysmatchComponent', () => {
  let component: TodaysmatchComponent;
  let fixture: ComponentFixture<TodaysmatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysmatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysmatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
