import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-sheet',
  imports: [],
  templateUrl: './profile-sheet.component.html',
  styleUrl: './profile-sheet.component.scss',
})
export class ProfileSheetComponent {
  @Output() close = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
}
