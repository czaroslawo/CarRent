import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentItemScreenComponent } from './rent-item-screen.component';

describe('RentItemScreenComponent', () => {
  let component: RentItemScreenComponent;
  let fixture: ComponentFixture<RentItemScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentItemScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentItemScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
