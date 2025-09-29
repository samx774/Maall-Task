import dummyNewsData, { NewsItem } from "@/news";
import NewsCard from "@/app/_components/NewsCard";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}
 export const revalidate = 60;
function getNewsById(id: number): NewsItem | undefined {
    return dummyNewsData.find((n) => n.id === id);
}
function getRelatedArticles(news: NewsItem): NewsItem[] {
    return dummyNewsData
        .filter((n) => n.category === news.category && n.id !== news.id)
        .slice(0, 3);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const news = getNewsById(parseInt(id));
    if (!news) return {};

    return {
        title: news.title,
        description: news.description,
        openGraph: {
            title: news.title,
            description: news.description,
            images: [
                {
                    url: news.image,
                },
            ],
        },
    };
}

export default async function NewsDetail({ params }: Props) {
    const { id } = await params;
    const news = getNewsById(parseInt(id));

    if (!news) return notFound();

    const relatedArticles = getRelatedArticles(news);

    return (
        <div className="container p-6">
            <div className="mb-10">
                <div className="relative h-100">
                    <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        priority
                        className="w-full object-cover rounded-md mb-4"
                    />
                </div>
                <h1 className="text-3xl font-bold mb-2">{news.title}</h1>
                <span className="text-sm text-gray-500">{news.category}</span>
                <p className="mt-4 text-gray-700">{news.description}</p>
            </div>

            {relatedArticles.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedArticles.map((related) => (
                            <NewsCard key={related.id} news={related} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
