
import Banner from '../../components/Banner'
import Header from '../../components/Header'
import Previews from '../../components/Previews'
import Navbar from '../../components/Navbar'

export default function Home() {
    return (
        <main className="min-h-screen mx-auto bg-black text-white h-[2000px] flex flex-col items-center relative">
            <div className="fixed top-0  z-50">
                <Header/>
            </div>
            <div className="w-[390px]">
                <Banner/>
            </div>
            <div className="w-[390px]">
                <Previews/>
            </div>
            <div className="w-[390px]">
                <Navbar />
            </div>
        </main>
    );
}