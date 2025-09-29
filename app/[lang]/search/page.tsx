import dummyNewsData, { NewsItem } from "@/news";
import NewsCard from "@/app/_components/NewsCard";
import { getTranslations } from "next-intl/server";

interface Props {
    searchParams: {
        q?: string;
    };
}

export const metadata = {
    title: "Search News",
    description: "Search for news articles",
}

export default async function SearchPage({ searchParams }: Props) {
    const t = await getTranslations();
    const { q } = await searchParams;
    const keyword = q?.toLowerCase() || "";

    const filteredNews: NewsItem[] = keyword
        ? dummyNewsData.filter(
            (n: NewsItem) =>
                n.title.toLowerCase().includes(keyword)
        )
        : [];

    const highlightText = (text: string) => {
        if (!keyword) return text;
        const regex = new RegExp(`(${keyword})`, "gi");
        return text.split(regex).map((part, i) =>
            regex.test(part) ? (
                <mark key={i} className="bg-yellow-200">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">{t("search.title")}</h1>

            <form method="get" className="mb-6">
                <input
                    type="text"
                    name="q"
                    placeholder={t('navbar.search')}
                    defaultValue={q || ""}
                    className="border p-2 rounded w-full"
                />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {t("navbar.search")}
                </button>
            </form>

            {keyword && filteredNews.length === 0 && (
                <p>{t("search.noResults", { keyword })}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((news) => (
                    <div key={news.id}>
                        <NewsCard
                            news={{
                                ...news,
                                title: highlightText(news.title) as unknown as string,
                                description: highlightText(news.description) as unknown as string,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
