import React, { useState } from "react";
import { PhoneCall, Mail, SendHorizonal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const initial = { name: "", email: "", subject: "", message: "" };

const ContactForm = () => {
  const { t } = useTranslation();
  const isHebrew = t('language') === 'he';
  const [fields, setFields] = useState(initial);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      // Create mailto link with the form data
      const subject = encodeURIComponent(fields.subject || t('contactFormSubject'));
      const body = encodeURIComponent(
        `${t('name')}: ${fields.name}\n${t('email')}: ${fields.email}\n\n${t('message')}:\n${fields.message}`
      );
      const mailtoLink = `mailto:0583265797d@gmail.com?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      setSent(true);
      setFields(initial);
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={`bg-white/90 max-w-xl mx-auto rounded-2xl px-7 py-8 border border-primary/20 shadow-xl mt-6 flex flex-col gap-4 animate-fade-in-up ${isHebrew ? 'text-right' : 'text-left'}`}>
      <h3 className="text-2xl font-bold mb-1 text-primary flex items-center gap-2 justify-center">
        <SendHorizonal className="w-6 h-6 text-primary" />
        {t('contactFormTitle')}
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-2">
        {t('contactFormDescription')}
      </p>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          required
          value={fields.name}
          onChange={onChange}
          placeholder={t('name')}
          className={cn("px-4 py-2 rounded border border-muted focus:ring-2 focus:ring-primary focus:outline-none")}
        />
        <input
          type="email"
          name="email"
          required
          value={fields.email}
          onChange={onChange}
          placeholder={t('email')}
          className={cn("px-4 py-2 rounded border border-muted focus:ring-2 focus:ring-primary focus:outline-none")}
        />
        <input
          type="text"
          name="subject"
          value={fields.subject}
          onChange={onChange}
          placeholder={t('subject')}
          className={cn("px-4 py-2 rounded border border-muted focus:ring-2 focus:ring-primary focus:outline-none")}
        />
        <Textarea
          name="message"
          required
          value={fields.message}
          onChange={onChange}
          placeholder={t('yourMessage')}
          className="min-h-[90px]"
        />
      </div>
      <button
        type="submit"
        className={cn("bg-primary text-white font-bold px-7 py-2 rounded-lg shadow hover:bg-primary/90 mt-2 transition")}
        disabled={sent || sending}
      >
        {sent ? t('messageSent') : sending ? t('sending') : t('send')}
      </button>
      <div className="flex flex-col gap-1 mt-3 text-sm items-center">
        <span className="flex items-center gap-1">
          <PhoneCall className={`w-4 h-4 text-primary ${isHebrew ? 'ml-1' : 'mr-1'}`} /> 03-123-4567
        </span>
        <span className="flex items-center gap-1">
          <Mail className={`w-4 h-4 text-primary ${isHebrew ? 'ml-1' : 'mr-1'}`} /> 0583265797d@gmail.com
        </span>
      </div>
    </form>
  );
};

export default ContactForm;
