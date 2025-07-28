import React from "react";

const aboutImages = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  // "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
];
// תמונה חדשה: סביבת עבודה מודרנית ונעימה
const clinicImage =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=95";

const ilanImg =
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=facearea&w=640&h=640&q=80";

const aboutTexts = [
  "מכון FocusWay נוסד במטרה להעניק ליווי מקצועי, אמפתי וחדשני – לילדים, מתבגרים ומבוגרים השואפים למצות את הפוטנציאל האישי שלהם באווירה פתוחה, תומכת ועוטפת.",
  "צוות המומחים שלנו משלב גישות טיפול מתקדמות עם יחס חם ואנושי הנותן ומעניק חיים: טיפול קוגניטיבי-התנהגותי (CBT), טיפול בתנועה, סביבה טבעית ושלווה – כל אלה יוצרים מעטפת הוליסטית להתפתחות רגשית וקוגניטיבית.",
  "המסע במכון כולל ליווי משפחתי והדרכת הורים, תמיכה מערכתית בשלבי החיים ובמקומות המאתגרים ביותר.",
  "במכון תרגישו בית – יחס אישי, פרטיות, תחושת ביטחון ואמונה בדרך שלכם. אנחנו כאן בשבילכם לכל אבן דרך במסע.",
];

const testimonialSection = [
  {
    name: "יעל, אם לילד מתבגר",
    quote:
      "לא האמנתי שנצליח לעבור את השנה הזו בלי פיצוצים בבית. הצוות ליווה אותנו בגובה העיניים, בהמון מקצועיות והשינוי פשוט מורגש. הילד רגוע, המשפחה יותר שמחה, וגם לי חזר הביטחון כהורה.",
  },
  {
    name: "דוד, בן 37",
    quote:
      "עברתי הרבה מטפלים – כאן בפעם הראשונה הרגשתי שרואים אותי באמת, בלי שיפוטיות, ויודעים לקדם אותי למטרות שבאמת חשובות לי.",
  },
];

const valueBlocks = [
  {
    title: "חדשנות מהלב",
    desc: "מתקדמים מדעית, פועלים מהלב. שילוב טכנולוגיה עם גישה קהילתית ואנושית.",
    img: aboutImages[4],
    bg: "from-yellow-100 via-pink-100 to-white",
  },
  {
    title: "שייכות וביטחון",
    desc: "אווירה משפחתית, תחושת שייכות בטוחה עם ליווי מסור לכל אחד ואחת.",
    img: aboutImages[3],
    bg: "from-green-100 via-blue-50 to-white",
  },
  {
    title: "רוגע בתנועה",
    desc: "ליווי בתנועה, בטבע, ברכיבה טיפולית – התחזקות רגשית וחברתית, לכל גיל.",
    img: aboutImages[1],
    bg: "from-blue-100 via-teal-100 to-white",
  },
];

const visionTexts = [
  "אצלנו כל אדם מקבל תחושת שייכות, אמון והבנה.",
  "המסע איתנו הוא צמיחה אישית בכל שלב – בסביבה בטוחה ותומכת שמאמינה בך באמת.",
  "צוות המכון כאן בשבילך – להעניק כלים, הקשבה וגישה אנושית כדי שתוכל לפרוח ולעבור כל אתגר.",
  "המכון שלנו הוא בית – לכל מי שמבקש תמיכה, הכלה והשראה.",
];

const About = () => (
  <main className="min-h-[95vh] w-full bg-gradient-to-tl from-primary/10 to-accent/5 flex justify-center items-start">
    <section className="relative flex flex-col items-center w-full max-w-6xl mx-auto mt-10 mb-16">
      {/* תמונה חדשה - סביבת עבודה מודרנית */}
      <div className="w-full mb-[-60px] flex items-center justify-center">
        <img
          src={clinicImage}
          alt="סביבת עבודה מודרנית ונעימה"
          className="rounded-3xl shadow-xl border-4 border-primary/10 w-full max-w-3xl object-cover h-72 md:h-96 lg:h-[350px] mx-auto"
          loading="eager"
        />
      </div>
      <div className="relative z-10 w-full mx-auto px-3 sm:px-6 md:px-14 py-14 bg-white/90 rounded-3xl shadow-2xl border border-accent/30 mt-[-40px]">
        <h1 className="text-5xl font-extrabold mb-10 text-primary text-center drop-shadow-lg font-playfair tracking-tight">
          מי אנחנו?
        </h1>
        <div className="mb-10 text-primary/90 space-y-5 max-w-3xl mx-auto text-center text-lg sm:text-xl leading-loose font-hebrew">
          {aboutTexts.map((txt, i) => (
            <p key={i}>{txt}</p>
          ))}
        </div>
        {/* קטע חזון / סלוגן – טקסט ממורכז, מעוצב אוורירי, קטן ובולט */}
        <section className="flex flex-col items-center mt-14 mb-8 px-4 w-full">
          <div className="w-full max-w-3xl bg-amber-50 py-10 px-6 rounded-xl shadow-inner">
            <h2 className="text-center text-3xl font-bold text-amber-800 mb-6 underline decoration-amber-400 decoration-2">
              החזון שלנו
            </h2>
            <div className="text-center font-hebrew text-amber-900 leading-loose tracking-wide text-[15px] sm:text-[16px] md:text-[17px]" style={{ fontWeight: 500 }}>
              {visionTexts.map((line, i) => (
                <span key={i} className="block mb-2">
                  {line}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* בלוקי ערכים */}
        <div className="flex flex-col md:flex-row gap-10 mt-10 mb-6 items-stretch justify-center">
          {valueBlocks.map((v, i) => (
            <div
              key={i}
              className={`rounded-2xl border shadow-lg bg-gradient-to-br ${v.bg} flex-1 flex flex-col items-center p-7 min-w-[220px] max-w-xs hover:scale-105 transition-all duration-300`}
            >
              <img
                src={v.img}
                alt={v.title}
                className="rounded-lg w-28 h-28 mb-4 object-cover border-2 border-accent/30 shadow-sm"
                loading="lazy"
              />
              <div className="text-2xl font-bold mb-1 text-primary">{v.title}</div>
              <div className="text-base text-muted-foreground text-center">
                {v.desc}
              </div>
            </div>
          ))}
        </div>
        {/* המלצות אישיות */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6 mt-6 text-center">
            מה מספרים עלינו?
          </h2>
          <div className="flex flex-col md:flex-row gap-7 justify-center items-stretch">
            {testimonialSection.map((t, i) => (
              <div
                key={i}
                className="bg-accent/40 rounded-2xl border border-accent/40 shadow-md p-5 flex-1 max-w-md mx-auto"
              >
                <div className="text-lg text-primary mb-2 font-semibold">"{t.quote}"</div>
                <div className="text-sm text-muted-foreground text-left text-end">{t.name}</div>
              </div>
            ))}
          </div>
        </section>
        {/* דמות אילן */}
        <div className="flex flex-col md:flex-row items-center gap-7 mt-14 mb-4 px-2 justify-center">
          <img
            src={ilanImg}
            alt="אילן משוש"
            className="rounded-full border-4 border-primary shadow-lg w-36 h-36 object-cover"
            loading="lazy"
          />
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              אילן משוש – חזון ומסורת
            </div>
            <div className="text-base text-muted-foreground max-w-lg">
              אילן היה מראשוני המטפלים במכון, ועיצב ברוחו את האקלים המשפחתי והקהילתי הייחודי. תרומתו והרוח האנושית שלו הן מגדלור לכולנו, וממשיכות ללוות אותנו בערכי הנתינה וההעצמה.
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <span className="text-primary font-extrabold text-3xl underline underline-offset-4">
            מוזמנים ליצור איתנו קשר, לשמוע ולשאול – הצוות שלנו כאן בשבילכם!
          </span>
        </div>
      </div>
    </section>
  </main>
);
export default About;
