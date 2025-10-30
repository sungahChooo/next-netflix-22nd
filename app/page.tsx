import Header from "@/components/Header";
import Banner from "@/components/Banner";

export default function Page() {
    return (
        <main className="min-h-screen mx-auto bg-black text-white h-[2000px] flex flex-col items-center relative">
            <div className="fixed top-0  z-50">
                <Header />
            </div>
            <div className="w-[390px]">
                <Banner />
            </div>
        </main>
    );
}
