import type { Metadata } from "next";
import WeatherPage from "@/app/weather/page";

export default function IndexPage() {
  return <WeatherPage />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
