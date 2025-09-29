
import { Link } from "@/i18n/navigation";
import { NewsItem } from "@/news";
import Image from "next/image";
import ImageFallback from "./ImageFallback";

interface Props {
  news: NewsItem;
  locale: string;
}


export default function NewsCard({ news, locale }: Props) {


  return (
    <Link href={`/${news.id}`} className="block h-full border rounded-md overflow-hidden shadow-md hover:shadow-lg transition">
      <ImageFallback width={500} height={500} src={news.image} alt={news.title} fallbackSrc="/fallback.png" className="w-full h-70 object-cover" />
      <div className="p-4">
        <span className="text-sm text-gray-500">{locale === "ar" ? news.categoryAr : news.category}</span>
        <h2 className="text-lg font-semibold mt-2">{locale === "ar" ? news.titleAr : news.title}</h2>
        <p className="text-gray-700 mt-1 line-clamp-3">{locale === "ar" ? news.descriptionAr : news.description}</p>
      </div>
    </Link>
  );
}
