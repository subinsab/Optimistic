"use client";

import dynamic from "next/dynamic";

const CityScene = dynamic(() => import("./CityScene"), {
  ssr: false,
  loading: () => null,
});

export default function CityBackground() {
  return <CityScene />;
}
