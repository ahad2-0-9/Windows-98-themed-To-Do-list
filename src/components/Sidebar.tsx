/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, PlusCircle, Archive, Bell, Settings, HelpCircle, CheckSquare } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'new-task', label: 'New Task', icon: <PlusCircle size={18} /> },
    { id: 'archive', label: 'Daily Archive', icon: <Archive size={18} /> },
    { id: 'checklist', label: 'Checklist', icon: <CheckSquare size={18} /> },
    { id: 'reminders', label: 'Reminders', icon: <Bell size={18} /> },
  ];

  return (
    <aside className="w-[240px] bg-win-gray border-r border-win-shadow/20 flex flex-col h-full z-50">
      <div className="p-6 mb-8">
        <h1 className="font-heading text-2xl font-bold tracking-tighter text-win-blue">TASK_CORE</h1>
        <p className="text-[10px] font-mono opacity-60">System Active</p>
      </div>

      <nav className="flex-1">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center px-4 py-3 text-sm transition-colors relative group ${
              activeTab === item.id 
              ? 'text-win-blue bg-white/10 before:content-[""] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:bg-win-blue' 
              : 'text-gray-600 hover:bg-white/5'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-mono font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 m-4 win95-inset bg-[#efeded]/50 text-[10px] font-mono">
        <div className="flex items-center justify-between mb-1">
          <span>CPU Load</span>
          <span className="text-win-blue font-bold">14%</span>
        </div>
        <div className="w-full h-2 bg-win-gray win95-inset">
          <div className="h-full bg-win-blue w-[14%]"></div>
        </div>
      </div>

      <div className="p-4 flex items-center gap-3 border-t border-win-shadow/10">
        <div className="w-10 h-10 win95-outset bg-gray-300 overflow-hidden">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI20tJFpL_8KnKOo4PCGt9U3-4k5cOQqSs5KkXLju4LxvHEvTW2JXHRFAr9AfuwP6vSCnWK-oeKmlb22fYdFGEG1rR5UuqL9JdbyHsYRQzq8pUiCrMwC78a9mqeYiHhRr0WuUCT2RU1ax8axCoYeL_58X4jsy9JvjjEH2lMOj765ghWT7oarzjEkxtVhG-DOSZaveSZtLUk1HbnNcLyCHGAxI3o_MM6LLcZgGQ2zqcjUooJy1Y6b2sL5uffm2yV7rh-kEulE819vM" alt="User" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xs font-bold font-mono">Admin</p>
          <p className="text-[9px] text-green-600 font-mono">Online</p>
        </div>
      </div>
    </aside>
  );
}
