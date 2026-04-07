// src/features/error/components/NotFound.tsx
import React from "react";
import { useTranslation } from "@/i18n";

interface NotFoundProps {
  lang: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ lang }) => {
  const { t } = useTranslation("404");

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-950 text-white overflow-hidden px-6">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative text-center max-w-2xl z-10">
        {/* Logo */}
        <div className="mb-6">
          <span className="text-xl tracking-widest uppercase text-neutral-400">
            MyFriend
          </span>
        </div>

        {/* 404 */}
        <h1 className="text-8xl md:text-[140px] font-extrabold leading-none tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-4">
          {t("subtitle")}
        </h2>

        {/* Description */}
        <p className="text-neutral-400 mb-10 max-w-lg mx-auto">
          {t("description")}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`/${lang}`}
            className="px-7 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            {t("backToHome")}
          </a>

          <button
            onClick={() => window.history.back()}
            className="px-7 py-3 rounded-full border border-white/30 hover:bg-white/10 transition duration-300 cursor-pointer"
          >
            {t("goBack")}
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-sm text-neutral-500">
          <p className="mb-3">{t("quickLinks")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`/${lang}`} className="hover:text-white transition">
              {t("home")}
            </a>
            <a href={`/${lang}#about-us`} className="hover:text-white transition">
              {t("about")}
            </a>
            <a href={`/${lang}#products`} className="hover:text-white transition">
              {t("products")}
            </a>
            <a href={`/${lang}#stores`} className="hover:text-white transition">
              {t("stores")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};