import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_ITEMS, NavItem } from '../../../../core/layout/nav.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Output() navigate = new EventEmitter<void>();
  profileMenuOpen = signal(false);

  items: NavItem[] = NAV_ITEMS;

  constructor(private el: ElementRef<HTMLElement>) {}

  onNavigate() {
    this.profileMenuOpen.set(false);
    this.navigate.emit();
  }

  toggleProfileMenu() {
    this.profileMenuOpen.update((v) => !v);
  }

  closeProfileMenu() {
    this.profileMenuOpen.set(false);
  }

  // close on outside click
  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent) {
    if (!this.profileMenuOpen()) return;
    const target = event.target as Node | null;
    if (target && !this.el.nativeElement.contains(target)) {
      this.profileMenuOpen.set(false);
    }
  }

  onProfileClick() {
    // TODO: route to /profile when you create it
    this.closeProfileMenu();
    this.navigate.emit();
  }

  onLogoutClick() {
    // TODO: call your AuthService.logout()
    this.closeProfileMenu();
    this.navigate.emit();
  }
}
