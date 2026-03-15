"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-primary">
          SalesforceAcademy
        </Link>

        {/* DESKTOP MENU */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="px-4 py-2">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4">
                  <ListItem href="/courses/admin" title="Admin">
                    Salesforce Admin training
                  </ListItem>
                  <ListItem href="/courses/developer" title="Developer">
                    Salesforce Developer training
                  </ListItem>
                  <ListItem href="/courses/lwc" title="LWC">
                    Lightning Web Components
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/blog" className="px-4 py-2">Blog</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about" className="px-4 py-2">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact" className="px-4 py-2">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/faq" className="px-4 py-2">FAQ</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/testimonials" className="px-4 py-2">Testimonials</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/live-classes" className="px-4 py-2">Live Classes</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/pricing" className="px-4 py-2">Pricing</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>

        {/* MOBILE MENU */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64">
            <nav className="flex flex-col gap-4 mt-6">

              <Link href="/">Home</Link>
              <Link href="/courses">Courses</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>

              <div className="border-t pt-4 flex flex-col gap-3">
                <ThemeToggle />
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            </nav>
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
