"use client";

import Link from "next/link";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "../ThemeToggle";
import { useUser } from "@/app/context/UserContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="max-w-9xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-3 leading-tight">
          {/* LOGO */}
          <motion.div
            initial={{ scale: 0.96 }}
            whileHover={{
              scale: 1.06,
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              duration: 0.45,
              ease: "easeInOut",
            }}
            className="relative shrink-0 py-2"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden flex items-center justify-center bg-white shadow-md group-hover:shadow-2xl transition-all duration-300">
              <Image
                src="/salesforce-academy/logo-bcm.png"
                alt="BlueCloudMentor Logo"
                width={220}
                height={220}
                className="object-cover w-full h-full scale-110"
                priority
              />
            </div>
          </motion.div>

          {/* TEXT */}
          <div className="flex flex-col justify-center leading-tight">
            <motion.span
              whileHover={{ x: 2 }}
              transition={{ duration: 0.3 }}
              className="text-lg sm:text-xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
                BlueCloud
              </span>
              <span className="text-foreground">Mentor</span>
            </motion.span>

            <span className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
              Learn. Build. Grow.
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="px-4 py-2">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/courses" className="px-4 py-2">
                  Courses
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/blog" className="px-4 py-2">
                  Blog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about" className="px-4 py-2">
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact" className="px-4 py-2">
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/careers" className="px-4 py-2">
                  Careers
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/live-classes" className="px-4 py-2">
                  Live Classes
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/testimonials" className="px-4 py-2">
                  Testimonials
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/faq" className="px-4 py-2">
                  FAQ
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/pricing" className="px-4 py-2">
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {!user ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>

              <Button asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              {/* ================= NOTIFICATION ================= */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-md hover:bg-muted">
                    <Bell size={20} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64">
                  <p className="text-sm text-muted-foreground p-4 text-center">
                    Notifications coming soon
                  </p>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* ================= PROFILE ================= */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center">
                    {user.email.charAt(0).toUpperCase()}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        user.role === "admin"
                          ? "/admin"
                          : user.role === "trainer"
                            ? "/trainer"
                            : "/student",
                      )
                    }
                  >
                    <User size={16} className="mr-2" />
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("token");
                      router.push("/auth/login");
                    }}
                    className="text-red-500"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* MOBILE MENU */}
        {/* MOBILE MENU */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden shrink-0">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="
      flex
      h-[calc(100vh-2rem)]
      w-[calc(100vw-2rem)]
      max-w-sm
      flex-col
      rounded-l-2xl
      p-0
      sm:hidden
    "
          >
            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b px-5 py-4">
              <div>
                <h2 className="text-base font-semibold">Menu</h2>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Explore BlueCloudMentor
                </p>
              </div>
            </div>

            {/* SCROLLABLE MENU */}
            <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              <div className="flex flex-col gap-1">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Home
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/courses"
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Courses
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/blog"
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Blog
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    About
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Contact
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/live-classes"
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Live Classes
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/testimonials"
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Testimonials
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/faq"
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    FAQ
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/careers"
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Careers
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/pricing"
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Pricing
                  </Link>
                </SheetClose>
              </div>
            </nav>

            {/* FIXED FOOTER */}
            <div className="shrink-0 border-t bg-background p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Appearance
                </span>

                <ThemeToggle />
              </div>

              {!user ? (
                <div className="grid grid-cols-2 gap-3">
                  <SheetClose asChild>
                    <Button variant="outline" asChild className="h-10">
                      <Link href="/auth/login">Login</Link>
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button asChild className="h-10">
                      <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                  </SheetClose>
                </div>
              ) : (
                <SheetClose asChild>
                  <Button
                    className="w-full"
                    onClick={() => {
                      router.push(
                        user.role === "admin"
                          ? "/admin"
                          : user.role === "trainer"
                            ? "/trainer"
                            : "/student",
                      );
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </SheetClose>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
}: {
  title: string;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block space-y-1 rounded-md p-3 hover:bg-muted"
        >
          <div className="text-sm font-medium">{title}</div>
          <p className="text-sm text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
