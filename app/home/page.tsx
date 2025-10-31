export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-[390px] bg-black relative flex flex-col overflow-hidden">
        <header className="h-16 bg-gray-800 text-white flex items-center justify-center">
          헤더영역
        </header>
        <main className="flex-1 overflow-y-auto text-white p-4">
          배너 영역
          <div className="h-64 bg-gray-700 my-4">섹션 영역</div>
          <div className="h-64 bg-gray-600 my-4">섹션 영역</div>
        </main>
      </div>
    </div>
  );
}
