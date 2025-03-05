"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SidebarLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Overlay that appears when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 md:relative top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Sidebar</h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </Button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="block p-2 hover:bg-gray-100 rounded">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-100 rounded">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-100 rounded">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-100 rounded">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarLayout;
