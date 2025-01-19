import React, { useState } from "react";
import LocationSelector from "../BuyerDashboardCompo/LocationSelector";

const LeftMenu = () => {
  const menuData = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx={12} cy={12} r={10} />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      ),
      label: "Discover",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx={11} cy={11} r={8} />
          <line x1={21} y1={21} x2={16.65} y2={16.65} />
        </svg>
      ),
      label: "Browse",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx={8.5} cy={7} r={4} />
        </svg>
      ),
      label: "Profile",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-white shadow-md p-2 w-20 h-screen">
      <LocationSelector />
      <nav>
        <ul className="space-y-4 mt-4">
          {menuData.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              label={item.label}
              isActive={index === activeIndex}
              onMenuItemClick={() => setActiveIndex(index)}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onMenuItemClick: () => void;
}

const MenuItem = ({
  icon,
  label,
  isActive,
  onMenuItemClick,
}: MenuItemProps) => {
  return (
    <li>
      <a
        href="#"
        onClick={onMenuItemClick}
        className={`flex flex-col items-center transition-colors p-2 ${
          isActive
            ? "bg-[#006769] rounded text-white"
            : "text-gray-600 hover:text-primary"
        }`}
      >
        {icon}
        <span className="text-tiny font-medium">{label}</span>
      </a>
    </li>
  );
};

export default LeftMenu;
