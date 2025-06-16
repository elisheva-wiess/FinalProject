import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Link } from "react-router-dom";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {
  Book,
  LogIn,
  Search,
  // HeartHandshake,
  // Heart,
  // Users2,
  // Brain
} from "lucide-react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const landscapeImg = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"; // ים/טבע - "מי אנחנו"
const flowersImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb"; // פרחים/יער - "מסע הטיפול שלכם"
const horsesImg = "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2"; // סוסים העצמה
const teamImg = "https://images.unsplash.com/photo-1438565434616-3ef039228b15"; // הרים (צוות)
const yoniImage = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80";
const flowersFieldImg = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=90";
const seaImg = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90";

// קישורים עיקריים 
const indexLinks = [
  { icon: Book, label: "מסע הטיפול שלכם", href: "#treatment-stages" },
  { icon: Search, label: "צפה בצוות המטפלים", href: "/therapists" },
  { icon: LogIn, label: "התחבר למערכת", href: "/login" },
];

const testimonials = [
  { name: "ענבל, אמא לנועם", feedback: "הרגשנו כמשפחה. המטפלים קשובים, אמפתיים ונתנו לנו ביטחון בכל שלב.", avatar: teamImg, },
  { name: "דני, סטודנט להנדסה", feedback: "סוף סוף טיפול שהותאם אליי, ממליץ במיוחד למי שמחפש שקט וריכוז.", avatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=400&q=80", },
  { name: "נעמי, עובדת הייטק", feedback: "חוויתי פריצת דרך. הליווי הצמוד במכון שילב מקצועיות ורוגע.", avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80", },
  { name: "חיים, אבא למתבגר", feedback: "הפניות לצוות תמיד נעימות. המקום נעים, חמים ונותן תחושת בית.", avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80", },
  { name: "ימית, מורה", feedback: "צוות מדהים, עזר לי להבין את הקשיים של התלמידים שלי – ממליצה בחום!", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80", },
  { name: "משה, בן 17", feedback: "לאורך כל הדרך הבנתי שאני לא לבד. תודה ענקית לכל הצוות שעזר לי להאמין בעצמי.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80", },
  { name: "עדי, עובדת סוציאלית", feedback: "המסגרת במכון שינתה לי את כל הגישה לילדים עם קשיים רגשיים.", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7?auto=format&fit=crop&w=400&q=80", },
  { name: "יוני, אבא לילדה בכיתה ג׳", feedback: "הבת שלי פרחה בזכות האבחון והתמיכה פה. ממליץ לכל ההורים!", avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80", },
  { name: "רות, מורה לגיל הרך", feedback: "תהליך הלמידה עם הכלים שקיבלתי שיפר אותי ואת הכיתה שלי.", avatar: "https://images.unsplash.com/photo-1519340333755-c8c3cbda29b4?auto=format&fit=crop&w=400&q=80", },
  { name: "ראובן, מתבגר", feedback: "פעם ראשונה שהרגשתי שמבינים אותי ולא שופטים אותי. תודה על הכל!", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80", },
  { name: "אורית, סבתא", feedback: "שמחתי לדעת שיש מקום כזה עם אוזן קשבת ולב ענק.", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80", },
  { name: "רועי, תלמיד", feedback: "לא הכל היה לי קל, אבל עם הצוות פה ידעתי שיעטפו ויעודדו אותי תמיד.", avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80", }
];

import React from "react";
import { useState } from "react";

export default function Index() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  const handlePrevTestimonials = () => {
    setTestimonialIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  const handleNextTestimonials = () => {
    setTestimonialIndex((prev) => (prev + 1) % totalSlides);
  };

  const getCurrentTestimonials = () => {
    const current = [];
    for (let k = 0; k < testimonialsPerSlide; k++) {
      const idx = (testimonialIndex * testimonialsPerSlide + k) % testimonials.length;
      current.push(testimonials[idx]);
    }
    return current;
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-start min-h-[100vh] bg-background text-right font-hebrew pb-0">
        <section className="bg-gradient-to-br from-accent/30 to-background pb-8 w-full shadow-lg animate-fade-in">
          <div className="container flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 pt-8 px-2 md:px-6">
              <h1 className="text-4xl md:text-6xl font-extrabold text-primary drop-shadow mb-4 text-center md:text-right flex items-center justify-center gap-2 md:justify-end">
                ברוכים הבאים למכון קשב וריכוז
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 text-center md:text-right max-w-xl">
                המקום המוביל בישראל לאבחון, טיפול וייעוץ מקצועי בהפרעות קשב וריכוז למבוגרים וילדים.<br />
                צוות מומחים רב-תחומי, יחס אישי, התאמה מלאה לכל מטופל.
              </p>
              <div className="flex gap-3 flex-wrap mt-4 mb-6 justify-center md:justify-start">
                <Link
                  to="/signup"
                  className="bg-primary text-white px-7 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-primary/90 transition"
                >
                  הירשם עכשיו
                </Link>
                <Link
                  to="/specializations"
                  className="bg-accent/90 text-primary px-7 py-3 rounded-lg text-lg font-bold shadow-lg border border-primary/40 hover:bg-accent transition"
                >
                  צפה בהתמחויות
                </Link>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <img
                // src={yoniImage}
                src={"/unnamed.png"}
                alt="yoni"
                className="rounded-2xl shadow-lg w-full max-w-md h-80 object-cover object-center border border-muted"
                loading="lazy"
              />
            </div>
          </div>
        </section>
        <section className="container relative z-10 -mt-8">
          <div className="flex flex-wrap gap-5 justify-center mb-4">
            {indexLinks.map((item) =>
              item.href.startsWith("#") ? (
                // 👉 קישור פנימי בתוך הדף (עוגן)
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 px-5 py-2 bg-white/90 rounded-xl shadow-md font-bold text-primary border border-primary/10 hover:bg-accent/60 transition"
                >
                  <item.icon className="w-5 h-5 ml-1" />
                  {item.label}
                </a>
              ) : (
                // 👉 קישור רגיל לדף אחר
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 px-5 py-2 bg-white/90 rounded-xl shadow-md font-bold text-primary border border-primary/10 hover:bg-accent/60 transition"
                >
                  <item.icon className="w-5 h-5 ml-1" />
                  {item.label}
                </Link>
              )
            )}
          </div>
        </section>
        <section id="about" className="w-full bg-muted/50 py-12 mt-6">
          <div className="container flex flex-col md:flex-row gap-12 items-center">
            <img
              src={seaImg}
              alt="נוף מרהיב"
              className="rounded-xl w-full max-w-2xl object-cover border-2 border-muted shadow-md"
              loading="lazy"
              style={{ aspectRatio: "16/7" }}
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3 text-primary">מי אנחנו?</h2>
              <p className="text-lg text-muted-foreground mb-4">
                מכון קשב וריכוז מעניק מענה מקצועי ומותאם אישית לילדים, בני נוער ומבוגרים - באבחון, ייעוץ וטיפול פסיכולוגי, פסיכיאטרי ורגשי. הצוות כולל מומחים מובילים ומתמחים עם ניסיון עשיר.
              </p>
              <ul className="list-disc mr-5 space-y-1 text-muted-foreground text-base">
                <li>יחס אישי ומקצועי מיום הפנייה ועד סיום טיפול</li>
                <li>מעקב רציף והדרכה להורים וצוותי חינוך</li>
                <li className="text-primary">
                  הקפדה על סודיות ודיסקרטיות מלאה
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="specializations" className="container py-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary drop-shadow-md underline decoration-primary/60 decoration-2">
            תחומי התמחות במכון
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <ul className="space-y-2 text-lg text-muted-foreground">
                <li>• אבחון הפרעות קשב וריכוז</li>
                <li>• טיפול קוגניטיבי-התנהגותי (CBT)</li>
                <li>• טיוב למידה והכוונה רגשית</li>
                <li>• ייעוץ פסיכיאטרי ומרפאתי</li>
                <li>• הנחיית הורים וקבוצות תמיכה</li>
                <li>• טיפולים רגשיים ותחושתיים נוספים</li>
              </ul>
            </div>
            <img
              src={horsesImg}
              className="rounded-xl w-full max-w-xs shadow-md object-cover border-2 border-muted"
              alt="תחום התמחות"
              loading="lazy"
            />
          </div>
          <div className="flex justify-center mt-8">
            <Link
              to="/specializations"
              className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-primary/80 shadow transition"
            >
              לכל ההתמחויות &rarr;
            </Link>
          </div>
        </section>
        <section
          id="team"
          className="w-full bg-gradient-to-tr from-muted/70 via-accent/50 to-white py-12 animate-fade-in"
        >
          <div className="container flex flex-col md:flex-row gap-8 items-center">
            <img
              // src={teamImg}
              src={yoniImage}
              alt="צוות מקצועי"
              className="rounded-xl w-full max-w-xs shadow-md object-cover border-2 border-muted"
              loading="lazy"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3 text-primary">
                הכירו את הצוות
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                הצוות שלנו מורכב ממגוון רחב של אנשי מקצוע מהמעלה הראשונה – פסיכולוגים קליניים וחינוכיים, פסיכיאטרים מומחים, מאבחנים דידקטיים ונוירופסיכולוגיים, יועצות חינוכיות, מטפלים רגשיים ומדריכים מנוסים.
                כל חברי הצוות פועלים בגישה אינטגרטיבית ומבוססת ראיות, ומשלבים בין ידע מקצועי רחב לניסיון מעשי עשיר בעבודה עם ילדים, נוער ומבוגרים.
                אנו מקפידים על הכשרות מקצועיות שוטפות, השתלמויות עדכניות וליווי פדגוגי מתמיד – כדי להבטיח מענה טיפולי מותאם, רגיש ומתקדם לכל אדם ומשפחה הפונים אלינו.
              </p>
              <Link
                to="/therapists"
                className="bg-accent text-primary px-6 py-2 rounded-full font-bold hover:bg-primary hover:text-white transition shadow"
              >
                הכירו את המטפלים שלנו
              </Link>
            </div>
          </div>
        </section>
        <section id="treatment-stages" className="container py-16 w-full">
          <div className="w-full bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 rounded-3xl px-8 py-12 shadow-2xl border-2 border-accent/20">
            <div className="flex flex-col lg:flex-row lg:justify-between items-stretch gap-12">
              <div className="flex-1 text-center lg:text-right min-h-[400px] flex flex-col justify-center">
                <h3 className="text-4xl font-bold text-primary mb-4 drop-shadow-sm">
                  מסע הטיפול שלכם
                </h3>
                <p className="text-xl text-primary/80 font-medium mb-8">
                  שלב אחר שלב, עם ליווי מלא
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/60 rounded-xl p-5 shadow-md border border-accent/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <h4 className="font-bold text-primary text-lg">פנייה ראשונית</h4>
                    </div>
                    <p className="text-muted-foreground">שליחת טופס או יצירת קשר טלפוני</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-5 shadow-md border border-accent/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <h4 className="font-bold text-primary text-lg">שיחת ייעוץ</h4>
                    </div>
                    <p className="text-muted-foreground">שיחת הכוונה עם מומחה מהצוות</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-5 shadow-md border border-accent/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                      <h4 className="font-bold text-primary text-lg">אבחון מקצועי</h4>
                    </div>
                    <p className="text-muted-foreground">תהליך מקיף עם אנשי מקצוע מובילים</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-5 shadow-md border border-accent/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                      <h4 className="font-bold text-primary text-lg">טיפול מותאם</h4>
                    </div>
                    <p className="text-muted-foreground">תכנית אישית וליווי מקצועי צמוד</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-5 shadow-md border border-accent/30 md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                      <h4 className="font-bold text-primary text-lg">בקרה ומעקב</h4>
                    </div>
                    <p className="text-muted-foreground">משוב מתמיד, תמיכה וליווי עד להשגת התוצאות הרצויות</p>
                  </div>
                </div>
              </div>
              <div className="w-80 flex-shrink-0 relative">
                <img
                  src={flowersFieldImg}
                  alt="מסע הטיפול"
                  className="rounded-2xl w-full h-full object-cover shadow-xl border-4 border-white/80"
                  loading="lazy"
                />
                <div className="absolute -top-4 -right-4 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg">
                  ✨
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-10">
          <h2 className="text-xl font-bold mb-4 text-primary text-center">מאמרים אחרונים</h2>
          <ul className="max-w-2xl mx-auto space-y-3">
            <li className="block bg-accent/30 rounded-md p-4 shadow font-hebrew">
              <strong>איך מזהים קשיים אצל ילדים?</strong> מדריך ראשוני להורים.
            </li>
            <li className="block bg-accent/30 rounded-md p-4 shadow font-hebrew">
              <strong>טיפול קוגניטיבי-התנהגותי – מה זה בעצם?</strong> הסברים ועצות.
            </li>
            <li className="block bg-accent/30 rounded-md p-4 shadow font-hebrew">
              <strong>הורות לילדים עם ADHD:</strong> כלים מעשיים להתמודדות.
            </li>
          </ul>
          <div className="text-center mt-4">
            <a
              href="/articles"
              className="inline-block text-primary font-bold underline text-lg hover:text-accent transition"
            >
              לכל המאמרים &rarr;
            </a>
          </div>
        </section>
        <section className="w-full bg-accent/40 py-20" id="testimonials">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-9 text-primary text-center flex items-center justify-center gap-2">
              {/* <svg width={32} height={32} viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 7 16.686 4.67 13.987C2.436 11.414 3 8 6 8C7.142 8 8.266 8.55 9 9.447C9.733 8.55 10.858 8 12 8C15 8 15.565 11.413 13.33 13.987C11 16.686 12 21 12 21ZM12 21Z" stroke="#ee4466" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg> */}
              מהלקוחות שלנו
            </h2>
            <div className="w-full max-w-3xl mx-auto relative min-h-[320px]">
              <div className="flex transition-all duration-300">
                <div className="w-full absolute top-0 left-0 transition-transform duration-300 opacity-100 z-10">
                  <div className="flex gap-7 flex-col sm:flex-row">
                    {getCurrentTestimonials().map((t, idx) => (
                      <div key={idx} className="rounded-2xl bg-card border border-muted/60 shadow-lg p-7 flex flex-col items-center text-center min-h-[230px] animate-fade-in flex-1">
                        <img
                          src={t.avatar}
                          alt={t.name + "-img"}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary mb-3"
                        />
                        <h3 className="font-bold text-primary text-xl mb-2">
                          {t.name}
                        </h3>
                        <p className="text-muted-foreground font-normal">
                          {t.feedback}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={handlePrevTestimonials}
                className="absolute -right-16 top-1/2 -translate-y-1/2 bg-white shadow border border-muted rounded-full p-2 hover:bg-accent transition z-20"
                aria-label="קודם"
              >
                <svg width={28} height={28} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
              </button>
              <button
                onClick={handleNextTestimonials}
                className="absolute -left-16 top-1/2 -translate-y-1/2 bg-white shadow border border-muted rounded-full p-2 hover:bg-accent transition z-20"
                aria-label="הבא"
              >
                <svg width={28} height={28} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
            </div>
          </div>
        </section>
        <section className="container py-10">
          <h2 className="text-xl font-bold mb-4 text-primary text-center">שאלות נפוצות</h2>
          <Accordion type="multiple" className="max-w-2xl mx-auto space-y-3">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <strong>כמה זמן אורך התהליך?</strong>
              </AccordionTrigger>
              <AccordionContent>
                כל תהליך מותאם אישית, לרוב בין שבועות בודדים לחודשים בודדים.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <strong>האם המכון מתאים לילדים ומבוגרים?</strong>
              </AccordionTrigger>
              <AccordionContent>
                בהחלט. קיימת התמחות הן באבחון והן בטיפול בכל הגילאים.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <strong>האם נדרשת הפניה מרופא?</strong>
              </AccordionTrigger>
              <AccordionContent>
                לא בהכרח, ניתן לפנות עצמאית.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                <strong>איזה אנשי מקצוע יש במכון?</strong>
              </AccordionTrigger>
              <AccordionContent>
                פסיכולוגים, פסיכיאטרים, מאבחנים, עו"ס, מנחות הורים ועוד.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
      <ScrollToTopButton />
    </>
  );
}
