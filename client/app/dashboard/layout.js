"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  ListChecks,
  Clock,
  CheckCircle2,
  Tag,
  CalendarDays,
  BarChart2,
  Settings,
  Users,
  LogOut,
  Plus,
} from "lucide-react";
import Link from "next/link";
import TaskForm from "../components/TaskForm"; // Import TaskForm

const menuItems = [
  { label: "Tasks", icon: ListChecks, path: "/dashboard" },
  { label: "Users", icon: Users, path: "/dashboard/users" },
  { label: "Reports", icon: BarChart2, path: "/dashboard/reports" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
  { label: "Categories", icon: Tag, path: "#" },
  { label: "Calendar View", icon: CalendarDays, path: "#" },
  { label: "Analytics", icon: BarChart2, path: "#" },
];

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeLabel, setActiveLabel] = useState("Tasks");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const handleAddTask = (task) => {
    // You can handle the new task here (e.g., send to API or update state)
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow h-screen transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className={`font-bold text-lg transition-all ${collapsed ? "hidden" : "block"}`}>
            TaskTracker
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((c) => !c)}
            className="ml-auto"
          >
            <Menu />
          </Button>
        </div>
        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors group text-gray-700 ${
                activeLabel === item.label ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={() => setActiveLabel(item.label)}
            >
              <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
              <span className={`${collapsed ? "hidden" : "block"} flex-1`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
        {/* Logout Button at the bottom */}
        <div className="p-4 border-t mt-auto">
          <Button
            variant="ghost"
            className="flex items-center gap-3 w-full justify-start text-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 text-gray-400" />
            <span className={collapsed ? "hidden" : "block"}>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
          <h1 className="text-2xl font-bold">{activeLabel}</h1>
          <Button className="flex items-center gap-2" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> New Task
          </Button>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Modal for TaskForm */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <TaskForm
              onSubmit={handleAddTask}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}