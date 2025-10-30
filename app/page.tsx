import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Previews from "@/components/Previews";

export default function Page() {
    return (
        <main className="min-h-screen mx-auto bg-black text-white h-[2000px] flex flex-col items-center relative">
            {/* 헤더는 화면 중앙 고정 추천 */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-50">
                <Header />
            </div>

            <div className="w-[390px]">
                <Banner />
            </div>
            <div>
                <Previews />
            </div>
        </main>
    );
}