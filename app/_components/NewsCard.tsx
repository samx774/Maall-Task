import { Link } from "@/i18n/navigation";
import { NewsItem } from "@/news";
import Image from "next/image";

interface Props {
  news: NewsItem;
}

export default function NewsCard({ news }: Props) {
  return (
    <Link href={`/${news.id}`} className="block border rounded-md overflow-hidden shadow-md hover:shadow-lg transition">
      <Image width={500} height={500} src={news.image} alt={news.title} className="w-full h-70 object-cover" />
      <div className="p-4">
        <span className="text-sm text-gray-500">{news.category}</span>
        <h2 className="text-lg font-semibold mt-2">{news.title}</h2>
        <p className="text-gray-700 mt-1 line-clamp-3">{news.description}</p>
      </div>
    </Link>
  );
}
