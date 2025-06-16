
import React, { useState } from "react";
import { PhoneCall, Mail, SendHorizonal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const initial = { name: "", email: "", subject: "", message: "" };

const ContactForm = () => {
  const [fields, setFields] = useState(initial);
  const [sent, setSent] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true); // demo only!
    setFields(initial);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={onSubmit} className="bg-white/90 max-w-xl mx-auto rounded-2xl px-7 py-8 border border-primary/20 shadow-xl mt-6 flex flex-col gap-4 animate-fade-in-up">
      <h3 className="text-2xl font-bold mb-1 text-primary flex items-center gap-2 justify-center">
        <SendHorizonal className="w-6 h-6 text-primary" />
        טופס יצירת קשר
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-2">
        מלאו את הפרטים ונחזור אליכם בהקדם. פרטיכם ישמרו בסודיות מלאה.
      </p>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          required
          value={fields.name}
          onChange={onChange}
          placeholder="שם מלא"
          className={cn("px-4 py-2 rounded border border-muted focus:ring-2 focus:ring-primary focus:outline-none")}
        />
        <input
          type="email"
          name="email"
          required
          value={fields.email}
          onChange={onChange}
          placeholder="אימייל"
          className={cn("px-4 py-2 rounded border border-muted focus:ring-2 focus:ring-primary focus:outline-none")}
        />
        <input
          type="text"
          name="subject"
          value={fields.subject}
          onChange={onChange}
          placeholder="נושא"
          className={cn("px-4 py-2 rounded border border-muted focus:ring-2 focus:ring-primary focus:outline-none")}
        />
        <Textarea
          name="message"
          required
          value={fields.message}
          onChange={onChange}
          placeholder="ההודעה שלך"
          className="min-h-[90px]"
        />
      </div>
      <button
        type="submit"
        className={cn("bg-primary text-white font-bold px-7 py-2 rounded-lg shadow hover:bg-primary/90 mt-2 transition")}
        disabled={sent}
      >
        {sent ? "ההודעה נשלחה!" : "שלח"}
      </button>
      <div className="flex flex-col gap-1 mt-3 text-sm items-center">
        <span className="flex items-center gap-1">
          <PhoneCall className="w-4 h-4 text-primary ml-1" /> 03-123-4567
        </span>
        <span className="flex items-center gap-1">
          <Mail className="w-4 h-4 text-primary ml-1" /> info@kshv.com
        </span>
      </div>
    </form>
  );
};

export default ContactForm;
