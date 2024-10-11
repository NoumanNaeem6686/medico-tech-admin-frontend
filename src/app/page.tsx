import { getStats } from "@/actions/stats-action";
import HomeMain from "@/components/HomeMain";
import React from "react";

export default async function  Home() {
  const {data,error} = await getStats()
  console.log("🚀 ~ Home ~ data:", data)
  return <HomeMain data={data} />;
}
