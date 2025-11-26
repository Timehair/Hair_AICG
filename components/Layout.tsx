import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scissors, Home, Sparkles, Image as ImageIcon, Menu, X, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '首页', path: '/', icon: <Home size={20} /> },
    { label: '开始设计', path: '/design', icon: <Sparkles size={20} /> },
    { label: '我的发型', path: '/gallery', icon: <ImageIcon size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background-dark text-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background-dark/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Scissors size={20} />
              </div>
              <span className="text-lg font-bold tracking-tight">AI发型屋</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User Profile / Actions */}
            <div className="hidden md:flex items-center gap-4">
               <button className="rounded-full bg-surface-dark p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <User size={20} />
               </button>
               <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 ring-2 ring-white/10" />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-surface-dark">
            <div className="space-y-1 px-4 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-background-dark py-8 mt-12">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
          <p>© 2024 AI发型屋. All Rights Reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">隐私政策</a>
            <a href="#" className="hover:text-primary transition-colors">服务条款</a>
            <a href="#" className="hover:text-primary transition-colors">联系我们</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;