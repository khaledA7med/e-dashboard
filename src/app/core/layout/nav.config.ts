export type NavItem = {
  label: string;
  path: string;
  icon?: string; // keep simple (string), later you can map to lucide/material icons
  roles?: string[]; // optional RBAC
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', icon: 'layout-dashboard.png', path: '/overview' },
  { label: 'Categories', icon: 'clipboard-list.png', path: '/categories' },
  { label: 'Occasions', icon: 'calendar-heart.png', path: '/occasions' },
  { label: 'Products', icon: 'package.png', path: '/products' },
  {
    label: 'Admins',
    icon: 'user.png',
    path: '/admins',
    roles: ['super_admin'],
  },
];
