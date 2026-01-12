import React from "react";

// export default function DashboardSideBar() {
//   return <div>DashboardSideBar</div>;
// }

import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

type DashboardSideBarProps = {
  collapsed?: boolean;
  onItemClick: () => void;
  setIsCollapsed: (value: boolean) => void;
  navLinks: any[];
  NavItem: React.FC<any>;
};

const DashboardSideBar = ({
  collapsed = false,
  onItemClick,
  setIsCollapsed,
  navLinks,
  NavItem,
}: DashboardSideBarProps) => (
  <div className="flex h-full flex-col">
    <Link
      to={"/"}
      className={`flex items-center justify-center bg-white ${
        collapsed ? "px-1 py-3" : "px-3 py-2"
      }`}
    >
      <h1
        className={`transition-all duration-300 text-center tektur-font font-bold text-[#4881FF] mb-2 lg:mb-2
        ${collapsed ? "text-sx lg:text-xl" : "text-3xl lg:text-3xl"}`}
      >
        Covermate
      </h1>
    </Link>

    {/* Collapse / Expand */}
    <div className="hidden border-t p-3 lg:block">
      {!collapsed ? (
        <button
          onClick={() => setIsCollapsed(true)}
          className="flex w-full items-center justify-between text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
          aria-label="Collapse sidebar"
        >
          <span>Hide Menu</span>
          <ArrowLeft />
        </button>
      ) : (
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex w-full items-center gap-3 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors"
          aria-label="Expand sidebar"
        >
          <ArrowRight />
        </button>
      )}
    </div>

    <nav className="flex-1 overflow-y-auto px-3 py-6">
      <div className="space-y-3">
        {navLinks.map((link) => (
          <NavItem
            key={link.to}
            link={link}
            onClick={onItemClick}
            collapsed={collapsed}
          />
        ))}
      </div>
    </nav>
  </div>
);

export default DashboardSideBar;
