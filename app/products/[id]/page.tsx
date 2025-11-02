"use client";

import ProductDetails from "@/components/product-details";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  return <ProductDetails productId={productId} />;
}
