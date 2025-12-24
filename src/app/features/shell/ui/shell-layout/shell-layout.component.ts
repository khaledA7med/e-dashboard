import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { MobileBottomNavComponent } from '../mobile-bottom-nav/mobile-bottom-nav.component';
import { ProfileSheetComponent } from '../profile-sheet/profile-sheet.component';
import { BreadcrumbComponent } from '../../../../shared/ui/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    TopbarComponent,
    BreadcrumbComponent,
    MobileBottomNavComponent,
    ProfileSheetComponent,
  ],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.scss',
})
export class ShellLayoutComponent {
  profileOpen = signal(false);

  openProfile() {
    this.profileOpen.set(true);
  }

  closeProfile() {
    this.profileOpen.set(false);
  }

  logout() {
    this.profileOpen.set(false);
    // TODO: call AuthService.logout()
  }
}
