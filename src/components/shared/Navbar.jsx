'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Menu, X, Library, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Browse', path: '/browse', icon: <BookOpen size={18} /> },
    { name: 'My Library', path: '/library', icon: <Library size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm' 
        : 'bg-linear-to-b from-background/90 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section - Using Primary Color */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
              <BookOpen className="text-primary-foreground" size={24} />
            </div>
            <span className="text-2xl font-bold text-primary tracking-tight">
              BookWorm
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.path 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground/70 hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-[1px] bg-border mx-2" />

            {/* Auth Buttons using your custom classes */}
            <div className="flex items-center space-x-3">
              <Link href="/login" className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors px-4">
                Login
              </Link>
              <Link href="/register" className="btn-primary !py-2 !px-5 !text-sm">
                <UserPlus size={16} />
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-2xl z-[60] p-6 md:hidden border-l border-border"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="font-bold text-primary text-xl">Menu</span>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-primary/5 text-primary">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${
                    pathname === link.path 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                      : 'bg-card border border-border text-foreground hover:border-primary/50'
                  }`}
                >
                  {link.icon}
                  <span className="font-semibold">{link.name}</span>
                </Link>
              ))}
              
              <div className="pt-6 mt-6 border-t border-border flex flex-col gap-4">
                <Link href="/login" className="btn-secondary w-full" onClick={() => setIsOpen(false)}>
                  <LogIn size={18} /> Login
                </Link>
                <Link href="/register" className="btn-primary w-full" onClick={() => setIsOpen(false)}>
                  <UserPlus size={18} /> Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;