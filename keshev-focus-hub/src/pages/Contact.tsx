import ContactForm from "@/components/ContactForm";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const isHebrew = t('language') === 'he';
  return (
    <main className="bg-muted/70 min-h-[70vh] pt-5 pb-16 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">
          {isHebrew ? 'צור קשר' : t('contact')}
        </h1>
        <ContactForm />
      </div>
    </main>
  );
};

export default Contact;