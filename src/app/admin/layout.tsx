'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Image as ImageIcon,
  FileUp,
  BarChart3,
  ExternalLink,
  LogOut,
  Sparkles,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Kelola Artikel', href: '/admin/articles', icon: FileText },
  { label: 'Kategori', href: '/admin/categories', icon: FolderTree },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Import DOCX', href: '/admin/import', icon: FileUp },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // If on login page, render without admin layout shell
  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsChecking(false);
      return;
    }

    const auth = typeof window !== 'undefined' ? localStorage.getItem('merem_admin_auth') : null;
    if (auth === 'utssukses') {
      setIsAuthenticated(true);
      setIsChecking(false);
    } else {
      setIsChecking(false);
      router.push('/admin/login');
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('merem_admin_auth');
      localStorage.removeItem('merem_admin_session');
    }
    router.push('/admin/login');
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#111113] flex flex-col items-center justify-center p-4">
        <img src="/logo-dark.png" alt="Loading..." className="h-10 w-auto object-contain animate-pulse mb-3" />
        <p className="text-xs text-neutral-400">Memeriksa izin akses admin...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-neutral-100 text-neutral-900 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-neutral-900 text-neutral-300 border-r border-neutral-800 shrink-0">
        {/* Brand */}
        <div className="p-5 border-b border-neutral-800">
          <Link href="/admin" className="inline-block mb-1 group">
            <img
              src="/logo-dark.png"
              alt="Merem CMS"
              className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-mono">
            Editorial Admin Panel
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />}
              </Link>
            );
          })}
        </nav>

        {/* Quick External Link & User Footer */}
        <div className="p-4 border-t border-neutral-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-neutral-400 hover:text-orange-400 p-2 bg-neutral-800/60 rounded-xs transition-colors"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <ExternalLink className="w-3.5 h-3.5" /> Buka Web Publik
            </span>
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs">
              <p className="font-bold text-white">Filius Patris</p>
              <p className="text-[10px] text-neutral-500">Editor in Chief</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded transition-colors"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-neutral-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-1 text-neutral-700 hover:bg-neutral-100 rounded"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Surabaya Culinary News Room
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles/new"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xs transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>+ Tulis Artikel</span>
            </Link>

            <Link
              href="/admin/import"
              className="hidden sm:inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs px-3 py-1.5 rounded-xs transition-colors"
            >
              <FileUp className="w-3.5 h-3.5 text-orange-600" />
              <span>Import Word</span>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Dropdown */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-neutral-900 text-neutral-300 p-4 border-b border-neutral-800 space-y-1">
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded text-xs font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-xs">
              <Link href="/" target="_blank" className="text-orange-400">
                Lihat Web Publik ↗
              </Link>
              <button onClick={handleLogout} className="text-red-400">
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Page Content Body */}
        <main className="p-4 sm:p-8 flex-1 overflow-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
