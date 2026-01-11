"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const pathname = usePathname();

  // এই ডাটা আপনার Firebase Auth থেকে আসবে
  const user = { role: "admin", name: "Siam" };
  const isLoggedIn = true;

  const navLinks =
    user?.role === "admin"
      ? [
          { name: "Dashboard", href: "/admin/dashboard" },
          { name: "Manage Books", href: "/admin/books" },
          { name: "Genres", href: "/admin/genres" },
          { name: "Reviews", href: "/admin/reviews" },
        ]
      : [
          { name: "My Library", href: "/my-library" },
          { name: "Browse", href: "/browse" },
          { name: "Tutorials", href: "/tutorials" },
        ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 " />
          <span className="text-xl  font-bold tracking-tight text-primary">
            BookWorm
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-all duration-300 relative py-1
                  ${
                    isActive
                      ? "text-primary border-b-2 border-primary" // Active Style
                      : "text-muted-foreground hover:text-primary" // Hover Style
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="btn-secondary rounded-full h-10 w-10 p-0 overflow-hidden border border-primary/20"
                >
                  <User className="h-5 w-5 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 p-2">
                <div className="px-2 py-1.5 text-sm font-bold text-primary border-b mb-1">
                  {user?.name}
                </div>
                <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive cursor-pointer hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="secondary" className="btn-secondary font-bold">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-linear-to-b from-orange-50 to-white"
              >
                <div className="flex flex-col gap-5 mt-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-bold transition-colors 
                        ${
                          pathname === link.href
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
