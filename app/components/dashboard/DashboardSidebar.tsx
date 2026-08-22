"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import DraggableMenuButton from "./components/DraggableMenuButton";
import SidebarContent from "./components/SidebarContent";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cleanPath = pathname.replace(/^\/salesforce-academy/, "") || "/";
  const isAdmin = cleanPath === "/admin" || cleanPath.startsWith("/admin/");
  const isStudent =
    cleanPath === "/student" || cleanPath.startsWith("/student/");

  const isTrainer =
    cleanPath === "/trainer" || cleanPath.startsWith("/trainer/");

  const isActive = (path: string) => {
    if (path === "/") {
      return cleanPath === "/";
    }

    if (path === "/admin" || path === "/student" || path === "/trainer") {
      return cleanPath === path;
    }

    return cleanPath.startsWith(path);
  };

  const desktopLinkClass = (path: string) =>
    `group flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      collapsed ? "justify-center" : ""
    } ${
      isActive(path)
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  const mobileLinkClass = (path: string) =>
    `group flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileOpen((previous) => !previous);
  };

  return (
    <>
      {/* MOBILE DRAGGABLE MENU BUTTON */}
      <DraggableMenuButton open={mobileOpen} onToggle={toggleMobileMenu} />

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-50 cursor-default bg-black/50 backdrop-blur-[1px] md:hidden"
        />
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-[60] flex h-[100dvh] max-h-[100dvh] w-[min(82vw,320px)] flex-col overflow-hidden border-r bg-background shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          mobile
          collapsed={false}
          onCloseMobile={closeMobileMenu}
          onToggleCollapse={() => {}}
          linkClass={mobileLinkClass}
          isAdmin={isAdmin}
          isStudent={isStudent}
          isTrainer={isTrainer}
        />
      </aside>

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden h-dvh shrink-0 overflow-hidden border-r bg-background transition-all duration-300 md:flex ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent
          collapsed={collapsed}
          onCloseMobile={() => {}}
          onToggleCollapse={() => setCollapsed((previous) => !previous)}
          linkClass={desktopLinkClass}
          isAdmin={isAdmin}
          isStudent={isStudent}
          isTrainer={isTrainer}
        />
      </aside>
    </>
  );
}
