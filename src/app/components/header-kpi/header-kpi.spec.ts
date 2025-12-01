import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderKpi } from './header-kpi';

describe('HeaderKpi', () => {
  let component: HeaderKpi;
  let fixture: ComponentFixture<HeaderKpi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderKpi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderKpi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
