
import React from "react";

// נתוני מאמרים לדוגמה
const articles = [
  {
    id: 1,
    title: "איך מזהים קשיים אצל ילדים?",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80", // תמונה חדשה: סלון, אווירה משפחתית ונעימה, פתוחה לנטפרי
    description: "לעיתים זה אתגר – אך יש כלים שממש עוזרים ליום-יום.",
    content: `ילדים הסובלים מהפרעת קשב זקוקים להבית ברור, רוגע וגבולות עקביים. כלים מומלצים: תכנון שגרה ברורה יחד, חיזוקים חיוביים, מגירות "הפתעה" לפעילויות משותפות ושיח פתוח על רגשות ותסכולים. גם להורה מגיעה תמיכה וליווי!`,
    links: [
      { href: "https://www.kishurei-adhd.org/parents", text: "עזרה ומידע באתר קישורי ADHD" }
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
