
import dummyNewsData, { NewsItem } from "@/news";
import NewsCard from "@/app/_components/NewsCard";
import Pagination from "@/app/_components/Pagination";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

interface Props {
  searchParams: {
    category?: string;
    page?: string;
  };
}

const ITEMS_PER_PAGE = 12;

export default async function HomePage({ searchParams }: Props) {
  const locale = await getLocale();
  const {category, page} = await searchParams;
  const categ =  category || "All";
  const currentPage = parseInt(page || "1");


  const filteredNews: NewsItem[] =
  categ ===  "All"
      ? dummyNewsData
      : dummyNewsData.filter((n) => locale === "ar" ? n.categoryAr === categ : n.category === categ);

  if (currentPage < 1) return notFound();

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages && totalPages !== 0) return notFound();

  const displayedNews = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const categories = ["All", ...Array.from(new Set(dummyNewsData.map((n) =>  locale === "ar" ? n.categoryAr : n.category)))];

  return (
    <div className="container my-10">

      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/?category=${cat}${totalPages < 1 ? "&page=" + currentPage : ""}`}
            className={`px-4 py-2 border rounded ${cat === categ ? "bg-blue-500 text-white" : ""
              }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedNews.map((news) => (
          <NewsCard locale={locale} key={news.id} news={news} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          category={categ}
        />
      )}
    </div>
  );
}
