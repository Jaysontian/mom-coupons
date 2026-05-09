import { notFound } from "next/navigation";
import { COUPONS } from "../../data";
import Detail from "./Detail";

export function generateStaticParams() {
  return COUPONS.map((c) => ({ id: c.id }));
}

export default async function CouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coupon = COUPONS.find((c) => c.id === id);
  if (!coupon) notFound();
  return <Detail coupon={coupon} />;
}
