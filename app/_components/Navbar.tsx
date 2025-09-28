import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export default function Navbar() {
    const lang = useLocale();
    const t = useTranslations();
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container flex items-center justify-between p-4">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    NewsPortal
                </Link>
                <nav className="flex space-x-4">
                    <Link
                        href={`/search`}
                        className="px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
                    >
                        {t("navbar.search")}
                    </Link>
                    <LanguageSwitcher lang={lang} />
                </nav>
            </div>
        </header>
    );
}
