import Banner from '@/components/home/section/Banner';
import HomeHeader from '@/components/home/HomeHeader';
import Previews from '@/components/home/section/Previews';
import KoreanMovies from '@/components/home/section/KoreanMovies';
import ContinueWataching from '@/components/home/section/ContinueWatching';
import MyList from '@/components/home/section/MyList';
import NetflixOriginals from '@/components/home/section/NetflixOriginals';
import NewReleases from '@/components/home/section/NewReleases';
import Hollywood from '@/components/home/section/Hollywood';
import Popular from '@/components/home/section/Popular';
import Top10 from '@/components/home/section/Top10';
import TrendingNow from '@/components/home/section/TrendingNow';
import Mysteries from '@/components/home/section/Mysteries';
import UsTvShow from '@/components/home/section/USTvShow';
import WatchItAgain from '@/components/home/section/WatchItAgain';
export default async function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-94 bg-transparent relative flex flex-col overflow-hidden pb-4 mb-20">
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
        <KoreanMovies />
        <Hollywood />
        <NetflixOriginals />
        <WatchItAgain />
        <NewReleases />
        <Mysteries />
        <UsTvShow />
      </div>
    </div>
  );
}
