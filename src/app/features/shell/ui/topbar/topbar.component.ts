import { Component, EventEmitter, Output } from '@angular/core';
import { BreadcrumbComponent } from '../../../../shared/ui/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  @Output() avatarClick = new EventEmitter<void>();
}
