import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatGroupUserNewModalComponent} from './chat-group-user-new-modal.component';

describe('ChatGroupNewComponent', () => {
  let component: ChatGroupUserNewModalComponent;
  let fixture: ComponentFixture<ChatGroupUserNewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatGroupUserNewModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupUserNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
