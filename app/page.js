import Image from "next/image";
import HeroSection from "./components/HeroSection";
import OurCollection from "./components/OurCollection";
import Collections from "./components/Collections";
import OurProducts from "./components/OurProducts";
import Category from "./components/Category";
import HappyClients from "./components/HappyClients";
import HeritageStory from "./components/HeritageStory";
import FeaturesStrip from "./components/FeaturesStrip";
import VideoReviews from "./components/VideoReviews";
import BlogSection from "./components/BlogSection";

export default function page() {
  return (
 <div className="">
<HeroSection />
<OurCollection />

<OurProducts />
<HeritageStory />
{/* <Category /> */}
{/* <HappyClients /> */}
<div className="relative">
  <div className="absolute top-0 left-0 h-full w-full bg-black/20"></div>
  <img src="/banner/homebannner.webp" className="w-full" />
  </div>
<FeaturesStrip />
<VideoReviews />
<BlogSection />
 </div>
  );
} 
