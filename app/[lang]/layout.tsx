import { hasLocale, NextIntlClientProvider } from "next-intl";
import Navbar from "../_components/Navbar";
import './globals.css';
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
};
export const metadata = {
    title: "Mini News Portal",
    description: "A simple news portal built with Next.js and Tailwind CSS",
};

export default async function LocaleLayout({ children, params }: Props) {
    const { lang } = await params;
    if (!hasLocale(routing.locales, lang)) {
        notFound();
    }
    const dir = lang === "ar" ? "rtl" : "ltr"
    const messages = await getMessages();
    return (
        <html lang={lang} dir={dir}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
