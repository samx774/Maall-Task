"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const changeLanguage = () => {
    const segments = pathname.split("/");
    segments[1] = lang === "en" ? "ar" : "en";
    router.push(segments.join("/"));
  };

  return (
    <button className="cursor-pointer" onClick={changeLanguage}>
      {t("navbar.language")}
    </button>
  );
}
