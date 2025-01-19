import React from "react";
import {
  Store,
  UtensilsCrossed,
  Cake,
  Store as Market,
  UtensilsCrossed as StreetFood,
  Coffee,
} from "lucide-react";

import supermarket from "../../../assets/images/supermarket.jpg";
import restaurant from "../../../assets/images/Restaurant.jpg";
import bakery from "../../../assets/images/Bakery.jpeg";

type StoreType = "Supermarket" | "Restaurant" | "Bakery";

interface ShopTypeCardProps {
  type: StoreType;
  image: string;
  icon: React.ReactNode;
}

const shopTypes: ShopTypeCardProps[] = [
  {
    type: "Supermarket",
    image: supermarket,
    icon: <Store className="w-8 h-8" />,
  },
  {
    type: "Restaurant",
    image: restaurant,
    icon: <UtensilsCrossed className="w-8 h-8" />,
  },
  {
    type: "Bakery",
    image: bakery,
    icon: <Cake className="w-8 h-8" />,
  },
];

const ShopTypeCard: React.FC<ShopTypeCardProps> = ({ type, image, icon }) => {
  return (
    <div className="w-full sm:w-56 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform hover:scale-95 cursor-pointer">
      <div className="relative h-48">
        <img src={image} alt={type} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
          <div className="text-white bg-white/20 p-3 rounded-full backdrop-blur-sm">
            {icon}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">{type}</h3>
            <p className="text-sm text-white/80 mt-1">
              Explore {type.toLowerCase()} options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Shoptype = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 overflow-x-auto py-4 scrollbar-hide">
      {shopTypes.map((shopType, index) => (
        <ShopTypeCard key={index} {...shopType} />
      ))}
    </div>
  );
};

export default Shoptype;
