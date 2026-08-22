import Link from "next/link";

import {
  Home,
  BookOpen,
  Users,
  CreditCard,
  Settings,
  User,
  Video,
  Award,
  Mail,
  LayoutDashboard,
  Briefcase,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

type SidebarContentProps = {
  collapsed: boolean;
  mobile?: boolean;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
  linkClass: (path: string) => string;
  isAdmin: boolean;
  isStudent: boolean;
  isTrainer: boolean;
};

export default function SidebarContent({
  collapsed,
  mobile = false,
  onCloseMobile,
  onToggleCollapse,
  linkClass,
  isAdmin,
  isStudent,
  isTrainer,
}: SidebarContentProps) {
  const showText = mobile || !collapsed;

  const handleLinkClick = () => {
    if (mobile) {
      onCloseMobile();
    }
  };

  return (
    <div className="flex flex-col">
      {/* HEADER */}
      <div
        className={`flex h-[64px] shrink-0 items-center border-b px-7.5 ${
          collapsed && !mobile ? "justify-center" : ""
        }`}
      >
        {showText && (
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex min-w-0 flex-1 flex-col justify-center leading-tight"
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-[15px] font-bold text-transparent sm:text-base">
              BlueCloudMentor
            </div>

            <div className="mt-0 text-[10px] text-muted-foreground">
              Learn. Build. Grow.
            </div>
          </Link>
        )}

        {mobile ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground ${
              showText ? "ml-6" : "mx-auto"
            }`}
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <PanelLeftOpen size={19} />
            ) : (
              <PanelLeftClose size={19} />
            )}
          </button>
        )}
      </div>
      {/* SCROLLABLE MENU */}
      <nav
        className={`sidebar-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 ${
          mobile ? "touch-pan-y [-webkit-overflow-scrolling:touch]" : ""
        }`}
      >
        <div className="space-y-1 pb-8">
          {/* ADMIN */}
          {isAdmin && (
            <>
              <Link
                href="/"
                onClick={handleLinkClick}
                className={linkClass("/")}
                title="Home"
              >
                <Home size={19} className="shrink-0" />
                {showText && <span>Home</span>}
              </Link>

              <Link
                href="/admin"
                onClick={handleLinkClick}
                className={linkClass("/admin")}
                title="Dashboard"
              >
                <LayoutDashboard size={19} className="shrink-0" />
                {showText && <span>Dashboard</span>}
              </Link>

              <Link
                href="/admin/courses"
                onClick={handleLinkClick}
                className={linkClass("/admin/courses")}
                title="Courses"
              >
                <BookOpen size={19} className="shrink-0" />
                {showText && <span>Courses</span>}
              </Link>

              <Link
                href="/admin/students"
                onClick={handleLinkClick}
                className={linkClass("/admin/students")}
                title="Students"
              >
                <Users size={19} className="shrink-0" />
                {showText && <span>Students</span>}
              </Link>

              <Link
                href="/admin/live-classes"
                onClick={handleLinkClick}
                className={linkClass("/admin/live-classes")}
                title="Live Classes"
              >
                <Video size={19} className="shrink-0" />
                {showText && <span>Live Classes</span>}
              </Link>

              <Link
                href="/admin/payments"
                onClick={handleLinkClick}
                className={linkClass("/admin/payments")}
                title="Payments"
              >
                <CreditCard size={19} className="shrink-0" />
                {showText && <span>Payments</span>}
              </Link>

              <Link
                href="/admin/recruitment"
                onClick={handleLinkClick}
                className={linkClass("/admin/recruitment")}
                title="Recruitment"
              >
                <Briefcase size={19} className="shrink-0" />
                {showText && <span>Recruitment</span>}
              </Link>

              <Link
                href="/admin/blog"
                onClick={handleLinkClick}
                className={linkClass("/admin/blog")}
                title="Blog"
              >
                <BookOpen size={19} className="shrink-0" />
                {showText && <span>Blog</span>}
              </Link>

              <Link
                href="/admin/testimonials"
                onClick={handleLinkClick}
                className={linkClass("/admin/testimonials")}
                title="Testimonials"
              >
                <Award size={19} className="shrink-0" />
                {showText && <span>Testimonials</span>}
              </Link>

              <Link
                href="/admin/settings"
                onClick={handleLinkClick}
                className={linkClass("/admin/settings")}
                title="Settings"
              >
                <Settings size={19} className="shrink-0" />
                {showText && <span>Settings</span>}
              </Link>

              <Link
                href="/admin/trainers"
                onClick={handleLinkClick}
                className={linkClass("/admin/trainers")}
                title="Trainers"
              >
                <User size={19} className="shrink-0" />
                {showText && <span>Trainers</span>}
              </Link>

              <Link
                href="/admin/contact"
                onClick={handleLinkClick}
                className={linkClass("/admin/contact")}
                title="Contact"
              >
                <Mail size={19} className="shrink-0" />
                {showText && <span>Contact</span>}
              </Link>
            </>
          )}

          {/* STUDENT */}
          {isStudent && (
            <>
              <Link
                href="/"
                onClick={handleLinkClick}
                className={linkClass("/")}
              >
                <Home size={19} className="shrink-0" />
                {showText && <span>Home</span>}
              </Link>

              <Link
                href="/student"
                onClick={handleLinkClick}
                className={linkClass("/student")}
              >
                <LayoutDashboard size={19} className="shrink-0" />
                {showText && <span>Dashboard</span>}
              </Link>

              <Link
                href="/student/courses"
                onClick={handleLinkClick}
                className={linkClass("/student/courses")}
              >
                <BookOpen size={19} className="shrink-0" />
                {showText && <span>My Courses</span>}
              </Link>

              <Link
                href="/student/my-applications"
                onClick={handleLinkClick}
                className={linkClass("/student/my-applications")}
              >
                <Briefcase size={19} className="shrink-0" />
                {showText && <span>My Applications</span>}
              </Link>

              <Link
                href="/student/live-classes"
                onClick={handleLinkClick}
                className={linkClass("/student/live-classes")}
              >
                <Video size={19} className="shrink-0" />
                {showText && <span>Live Classes</span>}
              </Link>

              <Link
                href="/student/certificates"
                onClick={handleLinkClick}
                className={linkClass("/student/certificates")}
              >
                <Award size={19} className="shrink-0" />
                {showText && <span>Certificates</span>}
              </Link>

              <Link
                href="/student/payments"
                onClick={handleLinkClick}
                className={linkClass("/student/payments")}
              >
                <CreditCard size={19} className="shrink-0" />
                {showText && <span>Payments</span>}
              </Link>

              <Link
                href="/student/profile"
                onClick={handleLinkClick}
                className={linkClass("/student/profile")}
              >
                <User size={19} className="shrink-0" />
                {showText && <span>Profile</span>}
              </Link>
            </>
          )}

          {/* TRAINER */}
          {isTrainer && (
            <>
              <Link
                href="/trainer"
                onClick={handleLinkClick}
                className={linkClass("/trainer")}
              >
                <LayoutDashboard size={19} className="shrink-0" />
                {showText && <span>Dashboard</span>}
              </Link>

              <Link
                href="/trainer/classes"
                onClick={handleLinkClick}
                className={linkClass("/trainer/classes")}
              >
                <Video size={19} className="shrink-0" />
                {showText && <span>My Classes</span>}
              </Link>

              <Link
                href="/trainer/profile"
                onClick={handleLinkClick}
                className={linkClass("/trainer/profile")}
              >
                <User size={19} className="shrink-0" />
                {showText && <span>Profile</span>}
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
