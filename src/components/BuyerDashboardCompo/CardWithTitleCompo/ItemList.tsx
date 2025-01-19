import React from "react";
import shopCover1 from "../../../assets/images/shopCover1.jpg";
import { Star } from "lucide-react";

// Define the Item interface
interface Item {
  id: number;
  image: string;
  title: string;
  description: string;
  availability: string;
  pickupTime: string;
  originalPrice: string;
  discountedPrice: string;
  rating: number;
}

// Sample data array
const items: Item[] = [
  {
    id: 1,
    image: shopCover1,
    title: "George's Greek Grill",
    description: "$21 Surprise Bag",
    availability: "5+ left",
    pickupTime: "Pick up tomorrow 9:45 AM - 10:00 AM | 1.1 mi",
    originalPrice: "$21.00",
    discountedPrice: "$6.99",
    rating: 4.3,
  },
  {
    id: 2,
    image: shopCover1,
    title: "Maria's Mexican Feast",
    description: "$18 Surprise Bag",
    availability: "2 left",
    pickupTime: "Pick up tomorrow 10:30 AM - 11:00 AM | 0.9 mi",
    originalPrice: "$18.00",
    discountedPrice: "$5.49",
    rating: 4.7,
  },
  // Add more items as needed
];

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-2 h-max max-w-[440px] min-w-[350px]">
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-32 object-cover rounded-t-xl"
          />
          <div className="absolute top-3 left-3 min-w-14 max-w-14 flex justify-center bg-secondary text-white text-tiny font-semibold px-2 py-1 rounded">
            {item.availability}
          </div>
          <div className="absolute min-w-14 max-w-14 top-3 gap-1 right-3 bg-white text-neutral text-tiny font-semibold px-2 py-1 rounded shadow-sm flex items-center">
            <Star
              className="text-green-500"
              size={16}
              fill="currentColor"
              strokeWidth={1}
            />
            <div className="h-full my-auto">{item.rating}</div>
          </div>
          <div className="absolute bottom-3 left-3">
            <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
              <img
                src={item.image}
                alt="shop logo"
                className="w- h- object-cover rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="pt-3">
          <h3 className="text-body font-bold text-neutral">{item.title}</h3>
          <p className="text-small text-neutral mt-1">{item.description}</p>
          <p className="text-tiny text-neutral mt-1">{item.pickupTime}</p>
          <div className="flex justify-end gap-4 items-center mt-3">
            <p className="text-tiny text-neutral line-through">
              {item.originalPrice}
            </p>
            <p className="text-header5 font-bold text-primary">
              {item.discountedPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemList: React.FC = () => {
  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
