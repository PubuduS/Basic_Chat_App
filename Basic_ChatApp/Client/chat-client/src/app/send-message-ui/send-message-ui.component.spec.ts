import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageUiComponent } from './send-message-ui.component';

describe('SendMessageUiComponent', () => {
  let component: SendMessageUiComponent;
  let fixture: ComponentFixture<SendMessageUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendMessageUiComponent]
    });
    fixture = TestBed.createComponent(SendMessageUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
