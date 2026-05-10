export type Coupon = {
  id: string;
  title: string;
  description: string;
  detail: string;
  color: string;
  image?: string;
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
    id: "us",
    title: "A Photo of Us",
    description: "From the day we wandered the city together.",
    detail:
      "A favorite frame from our walk. I'll print this one and frame it for your shelf — let me know which size you want.",
    color: "#000000",
    image: "/mom_and_i.webp",
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
