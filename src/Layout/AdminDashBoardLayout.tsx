// import React from "react";

// function AdminDashBoardLayout() {
//   return <div>AdminDashBoardLayout</div>;
// }

// export default AdminDashBoardLayout;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { useAppDispatch } from "@/hooks/useRedux";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

function AdminDashBoardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const dispatch = useAppDispatch();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    if (sidebarOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [sidebarOpen]);

  const navLinks = [
    { to: "/admin-dashboard", label: "Dashboard", icon: FaUsers, end: true },
    { to: "/admin-dashboard/all-users", label: "All Users", icon: FaUsers },
  ];

  const NavItem = ({
    link,
    onClick,
    collapsed = false,
  }: {
    link: (typeof navLinks)[0];
    onClick: () => void;
    collapsed?: boolean;
  }) => (
    <NavLink
      to={link.to}
      end={link.end}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 ${
          isActive
            ? "text-secondary border-secondary border-r-2 bg-blue-50 font-bold"
            : "font-medium text-white hover:text-gray-900"
        } ${collapsed ? "justify-center px-2" : ""}`
      }
    >
      {({ isActive }) => (
        <>
          <link.icon
            className={`h-5 w-5 flex-shrink-0 transition-colors ${
              isActive
                ? "text-secondary"
                : "text-gray-500 group-hover:text-gray-700"
            }`}
          />
          {!collapsed && <span className="truncate">{link.label}</span>}
        </>
      )}
    </NavLink>
  );

  const SidebarContent = ({
    collapsed = false,
    onItemClick,
  }: {
    collapsed?: boolean;
    onItemClick: () => void;
  }) => (
    <div className="flex h-full flex-col  ">
      <Link
        to={"/"}
        className={`flex items-center justify-center bg-white ${
          collapsed ? "px-1 py-3" : "px-3 py-2"
        }`}
      >
        <h1
          className={`transition-all duration-300 text-center tektur-font font-bold text-[#4881FF] mb-2 lg:mb-2
      ${collapsed ? "text-sx lg:text-xl" : "text-3xl lg:text-3xl"}
    `}
        >
          Covermate
        </h1>
      </Link>

      {/*  Show Collapse OR Expand button based on state */}
      <div className="hidden border-t   p-3 lg:block">
        {!collapsed ? (
          <button
            onClick={() => setIsCollapsed(true)}
            className="flex w-full items-center justify-between text-white rounded-lg px-3 py-2 text-sm font-medium  transition-colors cursor-pointer "
            aria-label="Collapse sidebar"
          >
            <span>Hide Menu</span>
            <ArrowLeft />
          </button>
        ) : (
          <button
            onClick={() => setIsCollapsed(false)}
            className="flex w-full items-center gap-3 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium  text-white transition-colors  "
            aria-label="Expand sidebar"
          >
            <ArrowRight />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6 ">
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

  return (
    <div className="flex h-screen overflow-hidden ">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Transition show={sidebarOpen} as={Fragment}>
        <div className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="flex h-full flex-col bg-white shadow-xl">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <SidebarContent onItemClick={() => setSidebarOpen(false)} />
            </div>
          </Transition.Child>
        </div>
      </Transition>

      <div
        className={`hidden transition-all duration-300 lg:flex  lg:flex-shrink-0 ${
          isCollapsed ? "lg:w-26" : "lg:w-64"
        }`}
      >
        <div className="flex w-full flex-col border-r border-gray-200 bg-[#353535] shadow-md">
          <SidebarContent collapsed={isCollapsed} onItemClick={() => {}} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="relative z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm lg:px-6">
          <button
            type="button"
            className="text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 items-center justify-end gap-4">
            <button
              type="button"
              className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              aria-label="View notifications"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-400 ring-2 ring-white" />
            </button>

            <Menu as="div" className="relative">
              <MenuButton className="flex cursor-pointer items-center gap-3 rounded-lg bg-white p-1.5 text-sm hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none">
                <div className="hidden text-left lg:block">
                  <p className="text-sm font-medium text-red-800">shaikot</p>
                  <p className="text-xs text-gray-500">Admin Profile</p>
                </div>
                <ChevronDownIcon
                  className="hidden h-4 w-4 text-gray-400 lg:block"
                  aria-hidden="true"
                />
              </MenuButton>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="border-b border-gray-100 px-4 py-4">
                    <p className="text-sm font-medium text-gray-900">shaikot</p>
                    <p className="text-sm text-gray-500">shaiot@gmail.com</p>
                  </div>
                  <div className="border-t border-gray-100 py-1">
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={() => navigate("/auth/login")}
                          className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                            focus
                              ? "bg-gray-100 text-gray-900 hover:bg-black hover:text-white rounded"
                              : "text-gray-700"
                          }`}
                        >
                          Sign Out
                        </button>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8 scrollbar-hide">
          <div className="mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashBoardLayout;
