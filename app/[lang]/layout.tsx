import { NextIntlClientProvider } from "next-intl";
import Navbar from "../_components/Navbar";
import './globals.css';
import { getMessages } from "next-intl/server";

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
