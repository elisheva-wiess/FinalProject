import React from "react";

// נתוני מאמרים כולל תוספת של 3 מאמרים חדשים
const articles = [
  {
    id: 1,
    title: "איך מזהים קשיים אצל ילדים?",
    image: "/articles/painting.jpg",
    description: "מדריך ראשוני להורים לזיהוי סימני קושי בהתמודדות יומיומית.",
    content: `מצבים של קושי בריכוז, מוסחות, ירידה בלימודים או שינויים התנהגותיים – ייתכנו מסיבות רבות. אך יש חשיבות לשים לב לדפוסים חוזרים: האם הילד מתקשה להתמיד במשימות? האם ישנו אי שקט בולט? האם הילד לעיתים מתוסכל לגבי יכולותיו? לאבחון מקצועי יש מקום חיוני אך גם ההקשבה והרגילות ההורית. מומלץ להתחיל בשיח רגוע עם הילד ולפנות לייעוץ מקצועי במקרה הצורך.`,
    links: [
      { href: "https://www.hebpsy.net/articles.asp?id=12345", text: "על סיבות נפוצות לקשיים בילדות" },
      { href: "https://www.yediot.co.il/articles/kids_attention_signs", text: "כתבה בידיעות – סימנים מוקדמים" }
    ]
  },
  {
    id: 2,
    title: "טיפול קוגניטיבי-התנהגותי – מה זה בעצם?",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=600&q=80",
    description: "CBT – כיצד הוא עובד, ואילו כלים מעניק לילדים ולמבוגרים.",
    content: `טיפול CBT מבוסס על זיהוי מחשבות ודפוסי התנהגות, והגמשתם. זהו טיפול ממוקד וקצר-מועד בדרך כלל – ועשוי להתאים במיוחד להפרעות קשב, חרדה ודכאון. המטופל לומד לזהות כיצד מחשבות משפיעות על ההתנהגות, ומאמץ כלים מעשיים להתמודדות ולשינוי חיובי.`,
    links: [
      { href: "https://www.pti.org.il/?CategoryID=81", text: "אתר העמותה הישראלית ל-CBT" }
    ]
  },
  {
    id: 3,
    title: "הורות לילדים עם ADHD: כלים מעשיים להתמודדות",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80",
    description: "לעיתים זה אתגר – אך יש כלים שממש עוזרים ליום-יום.",
    content: `ילדים הסובלים מהפרעת קשב זקוקים להבית ברור, רוגע וגבולות עקביים. כלים מומלצים: תכנון שגרה ברורה יחד, חיזוקים חיוביים, מגירות "הפתעה" לפעילויות משותפות ושיח פתוח על רגשות ותסכולים. גם להורה מגיעה תמיכה וליווי!`,
    links: [
      { href: "https://www.kishurei-adhd.org/parents", text: "עזרה ומידע באתר קישורי ADHD" }
    ]
  },
  {
    id: 4,
    title: "התמודדות עם היפראקטיביות: טיפים להורים",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
    description: "איך לעזור לילדים היפראקטיביים לנהל את האנרגיה שלהם בצורה חיובית.",
    content: `ילדים היפראקטיביים זקוקים למסגרת ברורה ותמיכה מתמשכת. חשוב לעודד פעילות גופנית, ליצור שגרות ברורות ולהציע פעילויות מרגיעות. שיתוף פעולה עם אנשי מקצוע הוא חיוני ליצירת סביבה מיטבית.`,
    links: [
      { href: "https://adhd.org.il/hyperactivity", text: "מידע על היפראקטיביות באתר ארגון ADHD" },
      { href: "https://www.healthychildren.org/English/health-issues/conditions/adhd/Pages/Hyperactivity-in-Children.aspx", text: "המלצות מ-Healthy Children (אנגלית)" }
    ]
  },
  {
    id: 5,
    title: "התאמת הסביבה ללמידה עם הפרעות קשב",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    description: "איך ליצור סביבת למידה תומכת לילדים עם קשיי קשב וריכוז.",
    content: `הסביבה משפיעה רבות על יכולת הריכוז והלמידה של הילד. הקפדה על שקט, סידור פשוט ונגישות לחומרים לימודיים הם גורמים מרכזיים. כמו כן, יש להימנע מהסחות דעת ולהשתמש בטכניקות גמישות כדי לעודד מוטיבציה.`,
    links: [
      { href: "https://www.understood.org/en/articles/creating-a-productive-learning-environment", text: "איך ליצור סביבת למידה פרודוקטיבית (אנגלית)" },
      { href: "https://www.kavnet.org.il/%D7%AA%D7%9B%D7%95%D7%9F-%D7%A1%D7%91%D7%99%D7%91%D7%94-%D7%9C%D7%9C%D7%9E%D7%99%D7%93%D7%94", text: "קווים לסביבת למידה תומכת – קו נט" }
    ]
  },
  {
    id: 6,
    title: "כיצד לתמוך בבני נוער עם קשיי קשב",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
    description: "עצות פרקטיות להורים ומורים לתמיכה בנוער המתמודד עם קשיי קשב וריכוז.",
    content: `בני נוער עם קשיי קשב זקוקים להבנה, סבלנות וכלים לניהול עצמי. מומלץ לשלב תמיכה רגשית עם שיטות ארגון כמו שימוש ביומנים, חלוקת משימות קטנות ותמיכה במיומנויות חברתיות. המפתח הוא תקשורת פתוחה והכלה.`,
    links: [
      { href: "https://www.additudemag.com/adhd-teen-tips/", text: "טיפים לבני נוער עם ADHD (אנגלית)" },
      { href: "https://www.nifga.org.il/%D7%A2%D7%9E%D7%95%D7%AA-%D7%95%D7%94%D7%9E%D7%95%D7%A8%D7%93%D7%AA", text: "עמותת ניפגע – תמיכה לנוער" }
    ]
  },
{
  id: 7,
  title: "הכנסת סדר לשגרה המשפחתית",
  image: "/articles/home.jpg",
  description: "למה שגרה קבועה חשובה במיוחד לילדים עם קשיים בריכוז.",
  content: `שגרה מסודרת מסייעת לילדים עם קשיי קשב להרגיש בטוחים ומוגנים. תכנון מראש של זמני שיעורים, פעילויות ומנוחה תורם להפחתת מתח ומשפר את היכולת להתמקד. מומלץ לשלב חיזוקים חיוביים והסברים ברורים לשינויים בשגרה.`,
  links: [
    { href: "https://www.parenting.org.il/routine-importance", text: "חשיבות השגרה באתר הורות ישראל" },
    { href: "https://www.healthychildren.org/English/family-life/family-dynamics/Pages/The-Importance-of-Family-Routines.aspx", text: "חשיבות שגרה משפחתית - HealthyChildren" }
  ]
},
{
  id: 8,
  title: "שיפור תקשורת בין הורים וילדים עם קשיי קשב",
  image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
  description: "טיפים לתקשורת טובה ואמפתית עם ילדים עם קשיי קשב.",
  content: `תקשורת ברורה, סבלנית והבנה רגשית היא המפתח ליחסים טובים בין הורים לילדים עם קשיי קשב. חשוב להקשיב ולתת מקום לביטוי רגשות, להשתמש בשפה פשוטה ולהיות עקביים בהנחיות ובגבולות.`,
  links: [
    { href: "https://www.kishurei-adhd.org/communication-tips", text: "עצות לתקשורת באתר קישורי ADHD" },
    { href: "https://www.psychologytoday.com/us/blog/parenting-and-the-adhd-brain/201904/communicating-effectively-kids-adhd", text: "Effective communication with ADHD kids (English)" }
  ]
},
{
  id: 9,
  title: "חשיבות הפעילות הגופנית לילדים עם קשיי קשב",
  image: "/articles/capacity.jpg",
  description: "איך פעילות גופנית מסייעת לריכוז והתנהגות חיובית.",
  content: `פעילות גופנית סדירה משפרת את תפקודי המוח, מפחיתה חרדה ומסייעת בהפחתת תסמיני קשיי קשב. מומלץ לשלב פעילויות כמו ריצה, שחייה או יוגה כחלק משגרה יומית.`,
  links: [
    { href: "https://www.adhd.org.il/exercise-benefits", text: "היתרונות של פעילות גופנית באתר ארגון ADHD" },
    { href: "https://www.cdc.gov/ncbddd/adhd/features/adhd-exercise.html", text: "ADHD and Exercise - CDC (English)" }
  ]
}
];

export default function Articles() {
  return (
    <main className="container py-14 min-h-[85vh] bg-muted/40">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center underline underline-offset-4">מאמרים</h1>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map(article => (
          <article
            key={article.id}
            className="bg-card rounded-2xl border border-accent shadow-xl flex flex-col overflow-hidden hover:shadow-2xl transition group animate-fade-in"
            style={{ direction: "rtl" }}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition"
              loading="lazy"
            />
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-bold mb-1 text-primary">{article.title}</h2>
              <p className="text-muted-foreground mb-2">{article.description}</p>
              <div className="text-base leading-relaxed mb-3 flex-1">{article.content}</div>
              <div className="flex flex-col gap-1 mt-2">
                {article.links.map((link, i) => (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-accent-foreground hover:underline text-sm"
                    key={i}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
