export type Coupon = {
  id: string;
  title: string;
  description: string;
  detail: string;
  color: string;
  surprise?: boolean;
};

export const COUPONS: Coupon[] = [
  {
    id: "breakfast",
    title: "Breakfast in Bed",
    description: "A slow morning, served on your favorite plate.",
    detail:
      "Pancakes, fresh fruit, a pot of coffee — and the newspaper if you still read it that way.",
    color: "#F4C7B8",
  },
  {
    id: "drive",
    title: "A Long Drive",
    description: "Wherever you want to go. I'll handle the playlist.",
    detail:
      "Pick a direction. We'll stop for snacks. The whole afternoon belongs to you.",
    color: "#B5C9F2",
  },
  {
    id: "garden",
    title: "An Afternoon in the Garden",
    description: "Hands in the dirt, no phone, no rush.",
    detail:
      "I'll do the digging and the lifting. You point at things and tell me where they go.",
    color: "#C7E0B5",
  },
  {
    id: "letter",
    title: "A Hidden Letter",
    description: "Tap to read it.",
    detail:
      "You taught me how to be patient with myself. I don't say that enough. I think about it almost every day.",
    color: "#E8D9A7",
    surprise: true,
  },
  {
    id: "dinner",
    title: "Dinner, Your Pick",
    description: "Anywhere. Any cuisine. My treat.",
    detail:
      "Reservation in your name. Dress up if you want — or don't. The night is yours.",
    color: "#D9B3D9",
  },
  {
    id: "memory",
    title: "A Memory I Kept",
    description: "Tap to reveal.",
    detail:
      "The summer we drove to the coast and got lost on purpose. You laughed the whole way back. I keep that one close.",
    color: "#E5B5B5",
    surprise: true,
  },
];
