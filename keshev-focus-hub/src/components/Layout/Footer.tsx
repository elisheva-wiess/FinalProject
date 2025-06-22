import { PhoneCall, Mail, Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-gradient-to-t from-primary/10 via-white to-white shadow-inner border-t border-border pt-10 pb-6 mt-16">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-10">
        {/* שמאל */}
        <div className="flex flex-col items-start gap-3 mb-5 md:mb-0">
          <Link
            to="/contact"
            className="text-lg font-bold text-primary hover:underline underline-offset-4"
          >
            <span className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              {t("contact")}
            </span>
          </Link>
          <span className="flex gap-1 items-center text-muted-foreground text-[15px]">
            <PhoneCall className="w-5 h-5 text-primary" />
            03-123-4567 | info@kshv.com
          </span>
          <span className="text-xs text-muted-foreground mt-2">
            {t("rights")} © {new Date().getFullYear()}
          </span>
        </div>

        {/* ימין */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary text-lg font-bold flex items-center gap-1">
            <Heart className="w-6 h-6 animate-pulse text-primary/60" />
            {t("footerTitle")}
          </span>
          <span className="text-muted-foreground text-xs">
            {t("footerValues")}
          </span>
          <Link
            to="/about"
            className="underline font-bold hover:text-primary/70 text-primary text-sm mt-1"
          >
            {t("aboutInstitute")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
