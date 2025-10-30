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
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-[375px] bg-black relative flex flex-col overflow-hidden">
        <header className="h-16 bg-gray-800 text-white flex items-center justify-center">
          헤더영역
        </header>
        <main className="flex-1 overflow-y-auto text-white">배너 영역</main>
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
