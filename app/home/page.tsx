import Banner from "../../components/home/Banner";
import HomeHeader from "../../components/home/HomeHeader";
import Previews from "@/components/home/Previews";
import AfricanMovies from "@/components/home/AfricanMovies";
import ContinueWataching from "@/components/home/ContinueWatching";
import MyList from "@/components/home/MyList";
import NetflixOriginals from "@/components/home/NetflixOriginals";
import NewReleases from "@/components/home/NewReleases";
import Nollywood from "@/components/home/Nollywood";
import Popular from "@/components/home/Popular";
import Top10 from "@/components/home/Top10";
import TrendingNow from "@/components/home/TrendingNow";
import ThrillerMysteries from "@/components/home/TvThrillerMysteries";
import UsTvShow from "@/components/home/USTvShow";
import WatchItAgain from "@/components/home/WatchItAgain";
export default async function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-[375px] bg-transparent relative flex flex-col overflow-hidden pb-4 mb-20">
        <div className="h-16 bg-black text-white flex items-center justify-center">
          <HomeHeader />
        </div>
        <Banner />
        <Previews />
        <ContinueWataching />
        <Popular />
        <TrendingNow />
        <Top10 />
        <MyList />
        <AfricanMovies />
        <Nollywood />
        <NetflixOriginals />
        <WatchItAgain />
        <NewReleases />
        <ThrillerMysteries />
        <UsTvShow />

      </div>
    </div>
  );
}
