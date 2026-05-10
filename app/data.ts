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
      "Because I can't be present for this year's Mother's Day, I scheduled an afternoon tea downtown at the Fairmont on the 23rd for when I'm back.",
    color: "#E8D7C3",
    image: "/afternoon_tea.png",
    link: {
      href: "http://links.opentable.com/ls/click?upn=u001.Xw1UZFgFVf2urHUB4IssFijfMnOEnJICdXKd5LVVmf0FTe5ucmZ0pK1INTPFkLwl8wRVIYUr16Sn7rSLHzCzx0SW8kziLvHpUWqiYC092Lmqm7019XJM6Mtx4ZyWfzknobeREGUMaYsOUFZMETj6ksoZT5thKgvSQef56VK5EDXyzK157TEQt6zv5sZSHdvUeMhKIJbSS936MVMpm-2BS0Gim2BfRi4eB9WvoPVzbQcGVVpf4MLv0EiHA4L-2BxFdBxUPaoFZ-2F7MTgPiwNXRqzkeUg-3D-3DfzYX_Up9sryR7QyarGQKzCJzEoVpb4xU3sZPD8wAJvylxETcgxXUlNn5r18XJPjS1akblT81mmtPZNxQb8zzpn9cUYL9W-2BHyexrJA1dZGmO-2BIHMXNxqXAKA0ZnW4VmALaCjrTmXqNYFiLsgyPb1sbeKZHV1EXMbRGHEzo4WnaVK9nx-2FKJJO-2FPfuAGNKkoQZen6kNQpBBE4MzWwCCi6BKUjyF9hATfsZMTNzNsKWsZD2Q9kP8PcxJ3sqixjAptZAVOupjD2Y1Rqg-2BLeAUQBT1VPMyxrpi5-2BMVuyzrVxRuOm-2FFqDy9Pe0b3f2ms2JZvpxEws6cUapGveXmqYeKpErkaWlXrqlz5prIepyT-2BVF5znFWT7q1yuwtInubnHlAq4uZmDff4mApb8hsbWWEjVPR72rSr6K30-2BIw-2BObl6zBZgvKjhSSbj6CZviXyPDkHuhVoiV6wVopp97ZEofGonRS8JAtWQjBDh2DX8e6dP9zGHVyiGy9dNx6UMNXkcM5xa1NoY79zk",
      label: "See tickets",
    },
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
    id: "flowers",
    title: "Flowers on the Way",
    description: "Expected delivery between 1 PM and 4 PM.",
    detail: "Your flowers are expected to deliver between 1 PM and 4 PM.",
    color: "#F7C9D3",
    image: "/flowers.png",
  },
  {
    id: "us",
    title: "A Photo of Us",
    description: "From the day we wandered the city together.",
    detail:
      "One of my favourite photos from when you visited last summer. I'll print this one and frame it for your shelf. Let me know which size you want.",
    color: "#000000",
    image: "/mom_and_i.webp",
  },
  {
    id: "parents",
    title: "You and Your Parents",
    description: "A favourite of the three of you.",
    detail: "You and your parents.",
    color: "#D9C7B0",
    image: "/9.JPG",
  },
  {
    id: "grandparents",
    title: "You and Your Grandparents",
    description: "A treasured photo with your grandparents.",
    detail: "You and your grandparents.",
    color: "#C7B89A",
    image: "/12.JPG",
  },
  {
    id: "mom",
    title: "Who Knew You Would Be My Mom",
    description: "Long before any of this.",
    detail: "Who knew you would be my mom.",
    color: "#E8C9B0",
    image: "/10.JPG",
  },
  {
    id: "thanks-mom",
    title: "Thanks for Being My Mom",
    description: "For everything, always.",
    detail: "Thanks for being my mom.",
    color: "#F2D6C7",
    image: "/pic1.webp",
  },
  {
    id: "video-calls",
    title: "Thank You for the Video Calls",
    description: "For staying close from far away.",
    detail: "Thank you for supporting me throughout video calling this past year.",
    color: "#D6E2F2",
    image: "/pic2.webp",
  },
  {
    id: "when-home",
    title: "Making the Best of It When I'm Home",
    description: "Every visit, the most of it.",
    detail: "And making the best of it when I am home.",
    color: "#E2D6F2",
    image: "/pic3.webp",
  },
  {
    id: "walking-tour",
    title: "Distillery District Walking Tour",
    description: "Toronto, May 23 — together.",
    detail:
      "Aside from the other surprise, I booked us a walking tour in Toronto's Distillery District so we can enjoy May 23 together.",
    color: "#D7C3A8",
    image: "/tour.png",
    link: {
      href: "https://www.getyourguide.com/booking/WW9DOI1GY1I9LHYOG6H7X2SKKJ56G1UN?partner_id=CD951&visitor_id=A2DKCL25AJULV99E58BSOYEO8HUVWNHZ&utm_source=getyourguide&utm_medium=email_transactional&utm_campaign=shopping_cart_confirmation_v2&utm_content=booking_summary_activity_details_move_v3",
      label: "View booking",
    },
  },
  {
    id: "cooking",
    title: "Cooking Me the Food I Want",
    description: "Every meal, exactly right.",
    detail: "And cooking me the food I want to eat.",
    color: "#F2E2C7",
    image: "/pic4.webp",
  },
];
