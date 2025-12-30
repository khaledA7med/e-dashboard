import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { MobileBottomNavComponent } from '../mobile-bottom-nav/mobile-bottom-nav.component';
import { ProfileSheetComponent } from '../profile-sheet/profile-sheet.component';
import { BreadcrumbComponent } from '../../../../shared/ui/components/breadcrumb/breadcrumb.component';
import { AuthFacade } from '../../../auth/facade';
import { AlertService } from '../../../../core/ui/alert/alert.service';

@Component({
  selector: 'app-shell-layout',
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
  private readonly auth = inject(AuthFacade);
  private readonly alert = inject(AlertService);

  profileOpen = signal(false);

  constructor() {
    effect(() => {
      if (!this.auth.isLoggedIn()) {
        this.profileOpen.set(false);
      }
    });
  }

  openProfile() {
    this.profileOpen.set(true);
  }

  closeProfile() {
    this.profileOpen.set(false);
  }

  async logout() {
    const res = await this.alert.confirm({
      title: 'Logout?',
      text: 'You will be signed out from the dashboard.',
      confirmText: 'Logout',
      cancelText: 'Cancel',
    });

    if (!res.isConfirmed) return;

    this.profileOpen.set(false);
    this.auth.logout();
  }
}
