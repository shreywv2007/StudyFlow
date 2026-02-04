import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarClock,
  GraduationCap,
  NotebookPen,
  Timer,
  TrendingUp,
  Heart,
  Settings,
  LogOut } from
'lucide-react';
interface NavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
}
export function Navigation({ activePage, onNavigate }: NavigationProps) {
  const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'deadlines',
    label: 'Deadlines',
    icon: CalendarClock
  },
  {
    id: 'gpa',
    label: 'GPA Calc',
    icon: GraduationCap
  },
  {
    id: 'notes',
    label: 'Notes',
    icon: NotebookPen
  },
  {
    id: 'planner',
    label: 'Study Timer',
    icon: Timer
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: TrendingUp
  },
  {
    id: 'wellbeing',
    label: 'Wellbeing',
    icon: Heart
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings
  }];

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{
          x: -20,
          opacity: 0
        }}
        animate={{
          x: 0,
          opacity: 1
        }}
        className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 z-40">

        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
              StudyFlow
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive ? 'text-white font-medium shadow-lg shadow-fuchsia-500/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>

                  {isActive &&
                  <motion.div
                    layoutId="activeNavDesktop"
                    className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30
                    }} />

                  }
                  <item.icon
                    className={`w-5 h-5 relative z-10 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-fuchsia-500'}`} />

                  <span className="relative z-10">{item.label}</span>
                </button>);

            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-100">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl w-full transition-colors">

            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-50 flex justify-between items-center overflow-x-auto no-scrollbar">
        {navItems.slice(0, 5).map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center p-2 min-w-[64px] rounded-xl transition-colors ${isActive ? 'text-fuchsia-600' : 'text-gray-400'}`}>

              <div
                className={`p-1.5 rounded-lg mb-1 ${isActive ? 'bg-fuchsia-50' : ''}`}>

                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium truncate w-full text-center">
                {item.label}
              </span>
            </button>);

        })}
        <button
          onClick={() => onNavigate('settings')}
          className={`flex flex-col items-center justify-center p-2 min-w-[64px] rounded-xl transition-colors ${activePage === 'settings' ? 'text-fuchsia-600' : 'text-gray-400'}`}>

          <div
            className={`p-1.5 rounded-lg mb-1 ${activePage === 'settings' ? 'bg-fuchsia-50' : ''}`}>

            <Settings className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </>);

}