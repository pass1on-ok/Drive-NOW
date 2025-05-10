import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTransferPaymentComponent } from './bank-transfer-payment.component';

describe('BankTransferPaymentComponent', () => {
  let component: BankTransferPaymentComponent;
  let fixture: ComponentFixture<BankTransferPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankTransferPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankTransferPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
