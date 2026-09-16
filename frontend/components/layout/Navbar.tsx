"use client";

import React, { useState } from "react";
import { UserRole } from "@/types";
import {
  Activity,
  Search,
  Bell,
  ChevronDown,
  UserCheck,
  Check,
  ShieldAlert,
  Sparkles,
  Command,
} from "lucide-react";

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedCaseId: string;
  onCaseChange: (caseId: string) => void;
  onSearch?: (query: string) => void;
  onOpenNewCaseModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  selectedCaseId,
  onCaseChange,
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const roles: UserRole[] = [
    "Treating Doctor",
    "Appointed Doctor",
    "Medical/Ethics Official",
    "Patient",
    "Admin",
  ];

  const notifications = [
    {
      id: "n1",
      title: "CASE-002 Safety Gate Active",
      time: "10m ago",
      urgent: true,
      desc: "Multidisciplinary review requested due to high-risk LAD stenosis.",
    },
    {
      id: "n2",
      title: "New Review Submitted",
      time: "45m ago",
      urgent: false,
      desc: "Dr. Rostova submitted independent assessment for CASE-001.",
    },
    {
      id: "n3",
      title: "Consensus Updated",
      time: "2h ago",
      urgent: false,
      desc: "Consensus threshold reached 68% for CASE-002.",
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4 max-w-[1400px] mx-auto">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shadow-xs">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">
                EthicSync
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-normal leading-none hidden sm:block">
              Clinical Decisions. Ethical. Transparent. Together.
            </p>
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cases, patients, or keywords..."
              className="w-full bg-[#F3F6FA] hover:bg-[#EEF2F7] focus:bg-white text-xs text-slate-800 placeholder-slate-400 pl-9 pr-12 py-2 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none transition-all"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-slate-400 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs pointer-events-none">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setRoleDropdownOpen(false);
              }}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Notifications</span>
                  <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer text-xs">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`font-semibold ${n.urgent ? "text-red-700" : "text-slate-800"}`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setRoleDropdownOpen(!roleDropdownOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
            >
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center">
                DP
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-xs font-semibold text-slate-900">Dr. Priya</div>
                <div className="text-[10px] text-slate-500">{currentRole}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {/* Role Switcher Menu */}
            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Perspective
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    View the decision support platform as:
                  </p>
                </div>
                <div className="py-1">
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        onRoleChange(r);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium transition-colors ${
                        currentRole === r
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck className={`w-3.5 h-3.5 ${currentRole === r ? "text-blue-600" : "text-slate-400"}`} />
                        <span>{r}</span>
                      </div>
                      {currentRole === r && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
