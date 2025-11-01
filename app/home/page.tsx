import Banner from "../../components/Banner";
import HomeHeader from "../../components/HomeHeader";
import Previews from "../../components/Previews";
import AfricanMovies from "@/components/AfricanMovies";
import ContinueWataching from "@/components/ContinueWatching";
import MyList from "@/components/MyList";
import NetflixOriginals from "@/components/NetflixOriginals";
import NewReleases from "@/components/NewReleases";
import Nollywood from "@/components/Nollywood";
import Popular from "@/components/Popular";
import Top10 from "@/components/Top10";
import TrendingNow from "@/components/TrendingNow";
import ThrillerMysteries from "@/components/TvThrillerMysteries";
import UsTvShow from "@/components/USTvShow";
import WatchItAgain from "@/components/WatchItAgain";
export default async function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black ">
      <div className="w-[375px] bg-transparent relative flex flex-col overflow-hidden pb-4">
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
