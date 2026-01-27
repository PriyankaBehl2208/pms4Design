import { ComponentFixture, TestBed } from '@angular/core/testing';

import { REVIEWCHECKLISTComponent } from './reviewchecklist.component';

describe('REVIEWCHECKLISTComponent', () => {
  let component: REVIEWCHECKLISTComponent;
  let fixture: ComponentFixture<REVIEWCHECKLISTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [REVIEWCHECKLISTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(REVIEWCHECKLISTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
