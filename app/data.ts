export type Coupon = {
  id: string;
  title: string;
  description: string;
  detail: string;
  color: string;
  image?: string;
  link?: { href: string; label: string };
  surprise?: boolean;
};

export const COUPONS: Coupon[] = [
  {
    id: "afternoon-tea",
    title: "Mother's Day Afternoon Tea",
    description: "CLOCKWORK at the Fairmont — May 23, 2026.",
    detail:
      "Mother's Day Afternoon Tea — Prelude. CLOCKWORK, 100 Front St W, Toronto. May 23, 2026 at 12:00 p.m. Two people. Fairmont's curated tea selection, seasonal savouries and sweets, live music, and the lobby's floral installation to wander before or after.",
    color: "#E8D7C3",
    image: "/afternoon_tea.png",
  },
  {
    id: "dessert",
    title: "Surprise Dessert Arriving at 3 PM",
    description: "A little something on its way to your door.",
    detail: "Click the link below to track delivery!",
    color: "#F4D7B8",
    image: "/cheesetart.webp",
    link: {
      href: "https://www.ubereats.com/orders/5299dfbf-193d-4451-ba05-430b9d3b8837",
      label: "Track delivery",
    },
  },
  {
    id: "us",
    title: "A Photo of Us",
    description: "From the day we wandered the city together.",
    detail:
      "A favorite frame from our walk. I'll print this one and frame it for your shelf — let me know which size you want.",
    color: "#000000",
    image: "/mom_and_i.webp",
  },
];
