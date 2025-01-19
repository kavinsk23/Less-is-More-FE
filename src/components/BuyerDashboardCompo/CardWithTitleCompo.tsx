import React from "react";
import ItemList from "./CardWithTitleCompo/ItemCard";

interface Section {
  id: number;
  title: string;
  actionText: string;
  onActionClick?: () => void;
}

const sections: Section[] = [
  {
    id: 1,
    title: "Shops Nearby",
    actionText: "See all",
    onActionClick: () => console.log("Featured Stores see all clicked"),
  },
  {
    id: 2,
    title: "Top Rated",
    actionText: "View more",
    onActionClick: () => console.log("Popular Items view more clicked"),
  },
  // Add more sections as needed
];

const CardWithTitleCompo: React.FC = () => {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.id}>
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral">
              {section.title}
            </h2>
            <span
              className="text-sm text-primary cursor-pointer"
              onClick={section.onActionClick}
            >
              {section.actionText}
            </span>
          </div>
          <ItemList />
        </div>
      ))}
    </div>
  );
};

export default CardWithTitleCompo;
