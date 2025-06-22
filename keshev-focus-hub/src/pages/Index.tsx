import { Header } from "@/components/Layout/Header";
import { Link } from "react-router-dom";
import { Chatbot } from "@/components/Chatbot";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {
  Book,
  LogIn,
  Search,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

const landscapeImg = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
const flowersImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb";
const horsesImg = "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2";
const teamImg = "https://images.unsplash.com/photo-1438565434616-3ef039228b15";
const yoniImage = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80";
const flowersFieldImg = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=90";
const seaImg = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90";

export default function Index() {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === 'he';

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialsPerSlide = 3;

  // Dynamic content based on language
  const indexLinks = [
    { icon: Book, label: t('treatmentJourney'), href: "#treatment-stages" },
    { icon: Search, label: t('viewTherapists'), href: "/therapists" },
    { icon: LogIn, label: t('loginToSystem'), href: "/login" },
  ];

  const testimonials = [
    { name: t('testimonial1Name'), feedback: t('testimonial1Text'), avatar: teamImg },
    { name: t('testimonial2Name'), feedback: t('testimonial2Text'), avatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=400&q=80" },
    { name: t('testimonial3Name'), feedback: t('testimonial3Text'), avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80" },
    { name: t('testimonial4Name'), feedback: t('testimonial4Text'), avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80" },
    { name: t('testimonial5Name'), feedback: t('testimonial5Text'), avatar: "/Recommend/teacher.jpg" },
    { name: t('testimonial6Name'), feedback: t('testimonial6Text'), avatar: "/Recommend/way.jpg" },
    { name: t('testimonial7Name'), feedback: t('testimonial7Text'), avatar: "/Recommend/work.jpg" },
    { name: t('testimonial8Name'), feedback: t('testimonial8Text'), avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80" },
    { name: t('testimonial9Name'), feedback: t('testimonial9Text'), avatar: "/Recommend/kids.jpg" },
    { name: t('testimonial10Name'), feedback: t('testimonial10Text'), avatar: "/Recommend/boy.jpg" },
    { name: t('testimonial11Name'), feedback: t('testimonial11Text'), avatar: "/Recommend/grandmother.jpg" },
    { name: t('testimonial12Name'), feedback: t('testimonial12Text'), avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80" }
  ];

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
      <main className={`flex flex-col items-center justify-start min-h-[100vh] bg-background pb-0 ${isHebrew ? 'text-right font-hebrew' : 'text-left'}`}>
        {/* HERO SECTION */}
        <section className="bg-gradient-to-br from-accent/30 to-background pb-8 w-full shadow-lg animate-fade-in">
          <div className="container flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 pt-8 px-2 md:px-6">
              <h1 className={`text-4xl md:text-6xl font-extrabold text-primary drop-shadow mb-4 text-center ${isHebrew ? 'md:text-right md:justify-end' : 'md:text-left md:justify-start'} flex items-center justify-center gap-2`}>
                {t('welcomeTitle')}
              </h1>
              <p className={`text-lg md:text-xl text-muted-foreground mb-6 text-center ${isHebrew ? 'md:text-right' : 'md:text-left'} max-w-xl`}>
                {t('welcomeSubtitle')}
              </p>
              <div className={`flex gap-3 flex-wrap mt-4 mb-6 justify-center ${isHebrew ? 'md:justify-start' : 'md:justify-start'}`}>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-7 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-primary/90 transition"
                >
                  {t('signupNow')}
                </Link>
                <Link
                  to="/specializations"
                  className="bg-accent/90 text-primary px-7 py-3 rounded-lg text-lg font-bold shadow-lg border border-primary/40 hover:bg-accent transition"
                >
                  {t('viewSpecializations')}
                </Link>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <img
                src={"/HomePage/unnamed.png"}
                // src={"/HomePage/brain.jpg"}
                alt="yoni"
                className="rounded-2xl shadow-lg w-full max-w-md h-80 object-cover object-center border border-muted"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* QUICK LINKS */}
        <section className="container relative z-10 -mt-8">
          <div className="flex flex-wrap gap-5 justify-center mb-4">
            {indexLinks.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 px-5 py-2 bg-white/90 rounded-xl shadow-md font-bold text-primary border border-primary/10 hover:bg-accent/60 transition"
                >
                  <item.icon className={`w-5 h-5 ${isHebrew ? 'ml-1' : 'mr-1'}`} />
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 px-5 py-2 bg-white/90 rounded-xl shadow-md font-bold text-primary border border-primary/10 hover:bg-accent/60 transition"
                >
                  <item.icon className={`w-5 h-5 ${isHebrew ? 'ml-1' : 'mr-1'}`} />
                  {item.label}
                </Link>
              )
            )}
          </div>
        </section>

        {/* ABOUT US */}
        <section id="about" className="w-full bg-muted/50 py-12 mt-6">
          <div className="container flex flex-col md:flex-row gap-12 items-center">
            <img
              src={seaImg}
              alt={t('beautifulLandscape')}
              className="rounded-xl w-full max-w-2xl object-cover border-2 border-muted shadow-md"
              loading="lazy"
              style={{ aspectRatio: "16/7" }}
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3 text-primary">{t('whoAreWe')}</h2>
              <p className="text-lg text-muted-foreground mb-4">
                {t('aboutUsDescription')}
              </p>
              <ul className={`list-disc ${isHebrew ? 'mr-5' : 'ml-5'} space-y-1 text-muted-foreground text-base`}>
                <li>{t('personalProfessionalCare')}</li>
                <li>{t('continuousFollowUp')}</li>
                <li className="text-primary">
                  {t('confidentialityPrivacy')}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SPECIALIZATIONS */}
        <section id="specializations" className="container py-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary drop-shadow-md underline decoration-primary/60 decoration-2">
            {t('specializationsTitle')}
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <ul className="space-y-2 text-lg text-muted-foreground">
                <li>• {t('adhdDiagnosis')}</li>
                <li>• {t('cbtTreatment')}</li>
                <li>• {t('learningGuidance')}</li>
                <li>• {t('psychiatricConsultation')}</li>
                <li>• {t('parentGuidance')}</li>
                <li>• {t('additionalTreatments')}</li>
              </ul>
            </div>
            <img
              src={horsesImg}
              className="rounded-xl w-full max-w-xs shadow-md object-cover border-2 border-muted"
              alt={t('specializationField')}
              loading="lazy"
            />
          </div>
          <div className="flex justify-center mt-8">
            <Link
              to="/specializations"
              className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-primary/80 shadow transition"
            >
              {t('allSpecializations')} &rarr;
            </Link>
          </div>
        </section>

        {/* TEAM */}
        <section
          id="team"
          className="w-full bg-gradient-to-tr from-muted/70 via-accent/50 to-white py-12 animate-fade-in"
        >
          <div className="container flex flex-col md:flex-row gap-8 items-center">
            <img
              src={yoniImage}
              alt={t('professionalTeam')}
              className="rounded-xl w-full max-w-xs shadow-md object-cover border-2 border-muted"
              loading="lazy"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3 text-primary">
                {t('meetOurTeam')}
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                {t('teamDescription')}
              </p>
              <Link
                to="/therapists"
                className="bg-accent text-primary px-6 py-2 rounded-full font-bold hover:bg-primary hover:text-white transition shadow"
              >
                {t('meetOurTherapists')}
              </Link>
            </div>
          </div>
        </section>

        {/* TREATMENT STAGES */}
        <section id="treatment-stages" className="container py-16 w-full">
          <div className="w-full bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 rounded-3xl px-8 py-12 shadow-2xl border-2 border-accent/20">
            <div className="flex flex-col lg:flex-row lg:justify-between items-stretch gap-12">
              <div className={`flex-1 text-center ${isHebrew ? 'lg:text-right' : 'lg:text-left'} min-h-[400px] flex flex-col justify-center`}>
                <h3 className="text-4xl font-bold text-primary mb-4 drop-shadow-sm">
                  {t('treatmentJourney')}
                </h3>
                <p className="text-xl text-primary/80 font-medium mb-8">
                  {t('stepByStepGuidance')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/60 rounded-xl p-5 shadow-md border border-accent/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <h4 className="font-bold text-primary text-lg">{t('initialContact')}</h4>
                    </div>
                    <p className="text-muted-foreground">{t('initialContactDesc')}</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-5 shadow-md border border-accent/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <h4 className="font-bold text-primary text-lg">{t('consultationCall')}</h4>
                    </div>
                    <p className="text-muted-foreground">{t('consultationCallDesc')}</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-5 shadow-md border border-accent/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                      <h4 className="font-bold text-primary text-lg">{t('professionalDiagnosis')}</h4>
                    </div>
                    <p className="text-muted-foreground">{t('professionalDiagnosisDesc')}</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-5 shadow-md border border-accent/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                      <h4 className="font-bold text-primary text-lg">{t('customizedTreatment')}</h4>
                    </div>
                    <p className="text-muted-foreground">{t('customizedTreatmentDesc')}</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-5 shadow-md border border-accent/30 md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                      <h4 className="font-bold text-primary text-lg">{t('followUpControl')}</h4>
                    </div>
                    <p className="text-muted-foreground">{t('followUpControlDesc')}</p>
                  </div>
                </div>
              </div>
              <div className="w-80 flex-shrink-0 relative">
                <img
                  src={"HomePage/treatment.jpg"}
                  alt={t('treatmentJourney')}
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

        {/* RECENT ARTICLES */}
        <section className="container py-10">
          <h2 className="text-xl font-bold mb-4 text-primary text-center">{t('recentArticles')}</h2>
          <ul className="max-w-2xl mx-auto space-y-3">
            <li className="block bg-accent/30 rounded-md p-4 shadow font-hebrew">
              <strong>{t('article1Title')}</strong> {t('article1Desc')}
            </li>
            <li className="block bg-accent/30 rounded-md p-4 shadow font-hebrew">
              <strong>{t('article2Title')}</strong> {t('article2Desc')}
            </li>
            <li className="block bg-accent/30 rounded-md p-4 shadow font-hebrew">
              <strong>{t('article3Title')}</strong> {t('article3Desc')}
            </li>
          </ul>
          <div className="text-center mt-4">
            <a
              href="/articles"
              className="inline-block text-primary font-bold underline text-lg hover:text-accent transition"
            >
              {t('allArticles')} &rarr;
            </a>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="w-full bg-accent/40 py-20" id="testimonials">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-9 text-primary text-center flex items-center justify-center gap-2">
              {t('fromOurClients')}
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
                className={`absolute ${isHebrew ? '-right-16' : '-left-16'} top-1/2 -translate-y-1/2 bg-white shadow border border-muted rounded-full p-2 hover:bg-accent transition z-20`}
                aria-label={t('previous')}
              >
                <svg width={28} height={28} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d={isHebrew ? "M9 6l6 6-6 6" : "M15 18l-6-6 6-6"} />
                </svg>
              </button>
              <button
                onClick={handleNextTestimonials}
                className={`absolute ${isHebrew ? '-left-16' : '-right-16'} top-1/2 -translate-y-1/2 bg-white shadow border border-muted rounded-full p-2 hover:bg-accent transition z-20`}
                aria-label={t('next')}
              >
                <svg width={28} height={28} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d={isHebrew ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container py-10">
          <h2 className="text-xl font-bold mb-4 text-primary text-center">{t('faq')}</h2>
          <Accordion type="multiple" className="max-w-2xl mx-auto space-y-3">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <strong>{t('faq1Question')}</strong>
              </AccordionTrigger>
              <AccordionContent>
                {t('faq1Answer')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <strong>{t('faq2Question')}</strong>
              </AccordionTrigger>
              <AccordionContent>
                {t('faq2Answer')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <strong>{t('faq3Question')}</strong>
              </AccordionTrigger>
              <AccordionContent>
                {t('faq3Answer')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                <strong>{t('faq4Question')}</strong>
              </AccordionTrigger>
              <AccordionContent>
                {t('faq4Answer')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
      <ScrollToTopButton />
      <Chatbot />
    </>
  );
}