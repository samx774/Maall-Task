import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface Props {
  currentPage: number;
  totalPages: number;
  category?: string;
}

export default function Pagination({ currentPage, totalPages, category }: Props) {
  const t = useTranslations();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getHref = (page: number) => {
    return `/?category=${category || "All"}&page=${page}`;
  };

  return (
    <div className="flex justify-center space-x-2 mt-6">
      <Link
        href={getHref(currentPage - 1)}
        className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
      >
        {t("pagination.prev")}
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={getHref(page)}
          className={`px-3 py-1 border rounded ${page === currentPage ? "bg-blue-500 text-white" : ""}`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={getHref(currentPage + 1)}
        className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
      >
        {t("pagination.next")}
      </Link>
    </div>
  );
}
