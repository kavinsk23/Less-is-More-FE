import React from "react";
import Shoptype from "./CardWithTitleCompo/ShopType";

interface Section {
  id: number;
  title: string;
  actionText: string;
  onActionClick?: () => void;
}

const sections: Section[] = [
  {
    id: 1,
    title: "Shop Category",
    actionText: "See all",
    onActionClick: () => console.log("Featured Stores see all clicked"),
  },
];

const CardWithTitleCompo: React.FC = () => {
  return (
    <div className="space-y-4 w-full sm:w-max">
      {sections.map((section) => (
        <div key={section.id}>
          <div className="flex justify-between">
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
          <Shoptype />
        </div>
      ))}
    </div>
  );
};

export default CardWithTitleCompo;
