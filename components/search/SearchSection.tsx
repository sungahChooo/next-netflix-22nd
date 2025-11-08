import Image from 'next/image';
import { ChangeEvent } from 'react';
interface SearchSectionProps {
  query: string;
  onChange: (value: string) => void; // 부모에게 query 전달
}
export default function SearchSection({ query, onChange }: SearchSectionProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="h-[60px] w-full flex items-center bg-[#424242] pr-3">
      <div className="flex flex-row mx-5 gap-4 flex-1">
        <Image src="/icons/search.svg" alt="search" width={20} height={20} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a show, movie, genre, e.t.c."
          className="text-white w-[270px] bg-transparent outline-none placeholder-gray-400"
        ></input>
      </div>
      {query && (
        <Image
          src="/icons/xButton.svg"
          alt="xbtton"
          width={15}
          height={15}
          className="cursor-pointer"
          onClick={() => onChange('')}
        />
      )}
    </div>
  );
}
