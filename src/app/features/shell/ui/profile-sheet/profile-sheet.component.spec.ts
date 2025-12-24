import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSheetComponent } from './profile-sheet.component';

describe('ProfileSheetComponent', () => {
  let component: ProfileSheetComponent;
  let fixture: ComponentFixture<ProfileSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
