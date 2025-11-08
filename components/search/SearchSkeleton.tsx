export default function MovieSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-[#424242] w-full h-[76px] flex items-center gap-3 pr-2 rounded-xl animate-pulse justify-between"
        >
          {/* 왼쪽 썸네일 영역 */}
          <div className="w-[146px] h-[76px] bg-gray-600 rounded-md flex-shrink-0" />

          {/* 가운데 제목 자리 */}
          <div className="flex-1 h-4 bg-gray-500 rounded-md max-w-[120px]" />

          {/* 오른쪽 아이콘 자리 */}
          <div className="w-[28px] h-[28px] bg-gray-500 rounded-full" />
        </div>
      ))}
    </div>
  );
}
