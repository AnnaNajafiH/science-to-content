import React from "react";
import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  FileText,
  CheckCircle,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";

const navigation = [
  {
    id: "trends",
    name: "Trend Detection",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    id: "generate",
    name: "Content Generator",
    icon: Sparkles,
    color: "text-blue-600",
  },
  {
    id: "review",
    name: "Review Queue",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: "internal",
    name: "Internal Briefs",
    icon: FileText,
    color: "text-orange-600",
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    color: "text-pink-600",
  },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <Link to="/">
          <Logo />
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Desktop navigation (use NavLink for active styling) */}
        <nav className="hidden lg:flex gap-2">
          {navigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.id === "trends" ? "/" : `/${item.id}`}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-beiersdorf-blue text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden py-4 border-t border-gray-200">
          {navigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.id === "trends" ? "/" : `/${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  isActive
                    ? "bg-beiersdorf-blue text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Header;
