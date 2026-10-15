import AllProducts from "@/components/AllProducts";
import Hero from "@/components/Hero";
import PriceDown from "@/components/PriceDown";
import PriceUp from "@/components/PriceUp";

export default function Home() {
  return (
    <div className="bg-[#f1f6f1]">
      <Hero/>
      <PriceUp/>
      <PriceDown/>
      <AllProducts/>
    </div>
  );
}
