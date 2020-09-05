import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFridgeModalComponent } from './add-to-fridge-modal.component';

describe('AddToFridgeModalComponent', () => {
  let component: AddToFridgeModalComponent;
  let fixture: ComponentFixture<AddToFridgeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToFridgeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToFridgeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
