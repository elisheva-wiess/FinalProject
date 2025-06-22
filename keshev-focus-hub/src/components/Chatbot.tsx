import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Languages, RotateCcw } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { getTranslation } from '../i18n/i18n';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  originalKey?: string;
  originalText?: string;
}

const isHebrew = (text: string) => /[\u0590-\u05FF]/.test(text);
const isEnglish = (text: string) => /[a-zA-Z]/.test(text);

export const getChatbotResponse = (
  message: string,
  language: 'he' | 'en'
): { text: string; key: string } => {
  const lowerMessage = message.toLowerCase();

  const check = (keywords: string[]) =>
    keywords.some((word) => lowerMessage.includes(word));

  const rules: { [key: string]: string[] } = {
    chatHours: ['שעות', 'פתוח', 'זמן', 'מתי', 'whene', 'hours', 'open', 'time'],
    chatPrice: ['מחיר', 'עלות', 'כסף', 'price', 'cost', 'money'],
    chatDiagnosis: ['אבחון', 'בדיקה', 'diagnosis', 'assessment'],
    chatTreatment: ['טיפול', 'therapy', 'treatment'],
    chatChildren: ['ילדים', 'גיל', 'children', 'age'],
    chatParents: ['הורים', 'משפחה', 'parents', 'family'],
    chatOnline: ['קורונה', 'זום', 'אונליין', 'covid', 'zoom', 'online'],
    chatLocation: ['מיקום', 'כתובת', 'איפה', 'location', 'address', 'where'],
    chatGreeting: ['שלום', 'היי', 'בוקר טוב', 'hello', 'hi', 'good morning'],
    chatThanks: ['תודה', 'תודה רבה', 'thank', 'thanks'],
    chatReferralInfo: ['הפנייה', 'רופא', 'referral', 'doctor'],
    chatIntroMeeting: ['פגישת היכרות', 'ייעוץ ראשוני', 'intro meeting', 'initial consultation'],
    chatTreatmentDuration: ['משך טיפול', 'מספר מפגשים', 'duration', 'sessions'],
    chatTreatmentTypes: ['סוגי טיפולים', 'שיטות טיפול', 'types of treatment', 'treatment methods'],
    chatAdhdDiagnosis: ['אבחון קשב', 'adhd diagnosis', 'ADHD'],
    chatAppointmentBooking: ['קבלת תורים', 'זימון', 'appointment', 'booking'],
    chatFamilySupport: ['ליווי משפחתי', 'הדרכת הורים', 'family support', 'parent guidance'],
    chatPsychiatryServices: ['שירותי פסיכיאטריה', 'רופא פסיכיאטר', 'psychiatry', 'psychiatrist'],
    chatOpeningHours: ['שעות פעילות', 'זמן קבלה', 'operating hours', 'opening hours'],
    chatNeuropsychDiagnosis: ['אבחון נוירופסיכולוגי', 'neuropsychological']
  };

  for (const [key, keywords] of Object.entries(rules)) {
    if (check(keywords)) {
      return { text: getTranslation(language, key), key };
    }
  }

  return { text: getTranslation(language, 'chatDefaultResponse'), key: 'chatDefaultResponse' };
};

export const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as 'he' | 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  useEffect(() => {
    const saved = localStorage.getItem('chatMessages');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const newLang = (e as CustomEvent).detail as 'he' | 'en';
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.isBot && msg.originalKey) {
            return { ...msg, text: getTranslation(newLang, msg.originalKey) };
          } else if (!msg.isBot && msg.originalText) {
            return { ...msg, text: msg.originalText };
          }
          return msg;
        })
      );
    };

    window.addEventListener('languageChanged', handleLangChange);
    return () => window.removeEventListener('languageChanged', handleLangChange);
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg: Message = {
      id: uuidv4(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
      originalText: inputMessage
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const typedHebrew = isHebrew(userMsg.text);
      const typedEnglish = isEnglish(userMsg.text);

      const isLangMismatch =
        (language === 'he' && typedEnglish) ||
        (language === 'en' && typedHebrew);

      if (isLangMismatch) {
        const warnKey = 'chatWrongLanguage';
        const warningMsg: Message = {
          id: uuidv4(),
          text: getTranslation(language, warnKey),
          isBot: true,
          timestamp: new Date(),
          originalKey: warnKey
        };
        setMessages((prev) => [...prev, warningMsg]);
        setIsTyping(false);
        return;
      }

      const { text, key } = getChatbotResponse(userMsg.text, language);
      const botMsg: Message = {
        id: uuidv4(),
        text,
        isBot: true,
        timestamp: new Date(),
        originalKey: key
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'he' ? 'en' : 'he';
    i18n.changeLanguage(newLang).then(() => {
      document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLang }));
    });
  };

  const handleResetChat = () => {
    const welcome = getTranslation(language, 'greeting');
    const botMsg: Message = {
      id: uuidv4(),
      text: welcome,
      isBot: true,
      timestamp: new Date(),
      originalKey: 'greeting'
    };
    setMessages([botMsg]);
    localStorage.setItem('chatMessages', JSON.stringify([botMsg]));
    setIsFirstOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (isFirstOpen && messages.length === 0) {
      handleResetChat();
    }
  };

  return (
    <>
      <button onClick={handleOpen} className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all">
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col overflow-hidden" dir={language === 'he' ? 'rtl' : 'ltr'}>
          <div className="bg-primary text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span>{t('title')}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggleLanguage}><Languages className="w-5 h-5" /></button>
              <button onClick={handleResetChat}><RotateCcw className="w-5 h-5" /></button>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex ${msg.isBot ? 'flex-row' : 'flex-row-reverse'} gap-2 max-w-[85%]`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.isBot ? 'bg-primary text-white' : 'bg-accent text-primary'}`}>
                    {msg.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-lg ${msg.isBot ? 'bg-gray-100 text-gray-800' : 'bg-primary text-white'}`}>
                    <p className="text-sm" dir={isHebrew(msg.text) ? 'rtl' : 'ltr'}>{msg.text}</p>

                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('placeholder')}
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none"
                dir={language === 'he' ? 'rtl' : 'ltr'}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-primary text-white px-3 py-2 rounded-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

