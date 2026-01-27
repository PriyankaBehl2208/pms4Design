import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PREPDIDISPTACHComponent } from './prepdi-disptach.component';

describe('PREPDIDISPTACHComponent', () => {
  let component: PREPDIDISPTACHComponent;
  let fixture: ComponentFixture<PREPDIDISPTACHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PREPDIDISPTACHComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PREPDIDISPTACHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
