// pages/paid-order/[orderId].tsx
import { authOptions } from "@/lib/nextAuthAdapter";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getServiceOrder } from "@/crud/cart";

const PaidOrderPage = async ({ searchParams }: { searchParams: { id: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin')
  const user = session.user as { id: string }
  const order = await getServiceOrder(searchParams.id, user.id, prisma)

  return (
    <div className="container mx-auto p-3 flex flex-col gap-3 items-center">
      <h1>Order Details</h1>
      <p>Order ID: {searchParams.id}</p>
      <div className=" flex flex-wrap gap-1"> {order?.items.map((item, index)=>(
      <div key={index}>
        <p>{item.service?.title}</p>
      </div>))}</div>
      <p>Status: {order?.status==='PAID' ? 'Paid' : 'Not Paid'}</p>
    </div>
  );
};

export default PaidOrderPage;
