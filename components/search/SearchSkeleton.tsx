export default function MovieSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="w-full h-[76px] bg-gray-700 rounded-xl animate-pulse">
          {/* 카드 안에 이미지 영역 */}
          <div className="w-[146px] h-[76px] bg-gray-600 rounded-md mx-auto mt-0"></div>
        </div>
      ))}
    </div>
  );
}
