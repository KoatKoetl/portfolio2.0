import type { ProjectCopy } from './types';

/** Keyed by the English project title, which is unique and never translated. */
export const roProjects: Record<string, ProjectCopy> = {
  'Felicia.md': {
    category: 'Full-stack',
    period: 'Perioada de lucru: 2 ani',
    des: 'Platformă e-commerce modernă pentru una dintre cele mai mari rețele de farmacii din Moldova: comenzi online, navigare în catalogul de produse și servicii medicale.',
    details: [
      'Am integrat funcționalități noi în template-ul Aspro existent, conform preferințelor clientului',
      'Am menținut site-ul funcțional în cazul erorilor neașteptate și le-am rezolvat cât mai rapid',
      'Am corectat problemele de traducere din componente',
    ],
  },
  Milina: {
    category: 'Dezvoltare front-end',
    period: 'Perioada de lucru: 2 ani',
    des: 'Milina este platforma web oficială a uneia dintre cele mai mari brutării industriale și producători de alimente din Moldova (parte din IUGINTERTRANS S.A.). Compania reunește mai multe brutării moderne (Taraclia, Comrat, Anenii Noi, Drochia) și un complex major de distribuție a produselor congelate la Ialoveni: peste 280 de produse de panificație, patiserie congelată și soluții B2B pentru HoReCa.',
    details: [
      'Am dezvoltat componente front-end responsive, aliniate la stilul de brand și standardele de layout',
      'Am implementat comportamente dinamice client-side și interfețe interactive de catalog pentru peste 280 de produse',
      'Am structurat template-uri de layout cross-browser optimizate pentru performanță pe desktop și mobil',
    ],
  },
  'Landing - Chess Website': {
    category: 'Landing page',
    period: 'Perioada de lucru: 1 lună',
    des: 'Descoperă lumea șahului: provocări și turnee de diferite formate.',
    details: ['Landing page static despre turnee de șah, construit cu HTML, CSS și JavaScript pur.'],
  },
  'Front-end App - AI Color Palette': {
    category: 'Proiect de echipă',
    period: 'Perioada de lucru: 2 luni',
    des: 'Color Inspo este o aplicație care funcționează ca un consultant personal, ajutând utilizatorii să găsească combinații cromatice armonioase pentru diverse scopuri.',
    details: ['Construit în echipă la Chingu. Folosește OpenAI API pentru a sugera palete de culori.'],
  },
  'Front-end App - Music Website': {
    category: 'Front-end',
    period: 'Perioada de lucru: 3 luni',
    des: 'Ai un interpret preferat? Adaugă-i muzica pe site și ascultă tot pe Deezer.com.',
    details: ['Preia muzica unui interpret prin RapidAPI și leagă fiecare piesă de Deezer.'],
  },
  'Fullstack E-commerce': {
    category: 'Full-stack',
    period: 'Perioada de lucru: 3 luni',
    des: 'Nu știi unde să cumperi sau să vinzi o mașină? Folosește noul site MotorMatch ca să-ți listezi mașina sau să cumperi una de la alți utilizatori.',
    details: [
      'Un marketplace unde utilizatorii își listează propriile mașini și răsfoiesc anunțurile altora',
      'Construit de la un capăt la altul: React și Redux pe front, Node.js și MongoDB pe back',
    ],
  },
  D1Fitness: {
    category: 'Full-stack',
    period: 'Perioada de lucru: 2 ani',
    des: 'D1 Fitness este o rețea modernă de cluburi de fitness bazate pe inovație, situată în Moscova (cluburi la Dmitrovskaya și Narodnogo Opolcheniya). Spre deosebire de sălile tradiționale cu contracte anuale rigide, platforma se bazează pe un abonament lunar flexibil.',
    details: [
      'Am dezvoltat un design nou din Figma și l-am aplicat peste logica deja existentă a site-ului',
      'Am implementat funcționalități de administrare CMS pentru ca clientul să poată modifica în siguranță datele fără intervenția unui dezvoltator',
      'Ca dezvoltator principal, am menținut site-ul funcțional în cazul erorilor neașteptate și le-am rezolvat cât mai rapid',
    ],
  },
  K1Fitness: {
    category: 'Full-stack',
    period: 'Perioada de lucru: 2 ani',
    des: 'K1 Fitness este o platformă premium de fitness din Kazahstan (k1fitness.kz), bazată pe modelul D1 Fitness. Platforma a fost migrată pe un server dedicat, rebranduită complet, integrată cu CRM-ul Bitrix24 pentru gestionarea automată a lead-urilor și extinsă cu suport complet bilingv (rusă și kazahă).',
    details: [
      'Am migrat proiectul pe o infrastructură nouă de servere și am realizat rebranding complet și adaptare structurală a codului original',
      'Am refactorizat arhitectura pentru a elimina rutarea pentru mai multe cluburi și a simplifica platforma pentru o singură locație principală',
      'Am implementat integrarea automată de captare a lead-urilor, trimițând formularele și cererile clienților direct în CRM-ul Bitrix24',
      'Am construit arhitectura multilingvă, adăugând o localizare completă în kazahă (kz) lângă versiunea implicită în rusă (ru)',
      'Am dezvoltat interfețe noi din design-uri Figma, integrate cu componentele Bitrix existente',
      'Am configurat panoul de administrare CMS astfel încât echipa clientului să gestioneze datele în siguranță fără intervenția unui dezvoltator',
      'Ca dezvoltator principal, am menținut stabilitatea platformei, sănătatea serverelor și rezolvarea rapidă a erorilor operaționale',
    ],
  },
  'Metru Patrat': {
    category: 'E-commerce full-stack',
    period: 'Perioada de lucru: 2 ani',
    des: 'Metru Patrat (operează prin bomi.md, cu showroom-uri în Chișinău și Drochia) este o platformă e-commerce majoră din Moldova și un lanț de magazine specializat în materiale de finisaj, obiecte sanitare și produse pentru renovare.',
    details: [
      'Am dezvoltat și personalizat componentele de catalog Bitrix pentru categoriile multiple de materiale de finisaj și sanitare',
      'Am construit interfețe responsive și am optimizat performanța front-end pentru navigarea într-un catalog complex',
      'Am corectat bug-urile de UI legate de navigarea utilizatorilor și de afișarea corectă a stocurilor, aplicând modificări care să împiedice reapariția lor',
      'Ca unul dintre dezvoltatorii principali, am menținut stabilitatea platformei, sănătatea serverelor și rezolvarea rapidă a erorilor operaționale',
    ],
  },
  Dveribelorussii: {
    category: 'E-commerce full-stack',
    period: 'Perioada de lucru: 2 ani',
    des: 'Dveribelorussii este platforma e-commerce oficială din Moldova și catalogul de retail al brandului Dveri Belorussii, specializat în uși de interior, de exterior și speciale, feronerie și soluții arhitecturale din sticlă.',
    details: [
      'Am implementat complet o secțiune nouă și am creat logica de salvare a comenzilor utilizatorilor în CMS-ul Bitrix standard',
      'Am optimizat codul vechi al template-ului pentru a aplica corect responsivitatea și am remediat multiple bug-uri de overflow în tot site-ul',
      'Am corectat erorile legate de funcționarea incorectă a filtrului din catalog, astfel încât utilizatorii să găsească produsele dorite',
    ],
  },
  Ohotnik: {
    category: 'E-commerce full-stack',
    period: 'Perioada de lucru: 2 ani',
    des: 'Ohotnik (ohotnik.com) este un magazin online rus de vânătoare și activități în aer liber, cu peste 7 000 de produse: arme specializate, optică termică, îmbrăcăminte tactică și fluxuri de rezervare a armelor.',
    details: [
      'Am construit o secțiune dinamică de catalog pentru produse promoționale și la reducere, cu rutare URL dedicată pentru descoperire și campanii de marketing țintite',
      'Am realizat optimizări complexe de performanță front-end și de platformă pe paginile principale, îmbunătățind semnificativ Core Web Vitals (LCP, CLS, INP)',
      'Am rezolvat bug-uri complexe de UI/UX și am dezvoltat componente Bitrix reutilizabile pentru template-urile cheie, inclusiv pagina principală și pagina de produs (PDP)',
      'Am scris scripturi PHP server-side pentru categorisirea automată a catalogului promoțional, validarea integrității sitemap-ului XML și analiza log-urilor după deploy',
      'Ca unul dintre dezvoltatorii principali, am supravegheat fiabilitatea site-ului, mentenanța uptime-ului și analiza rapidă a cauzelor erorilor operaționale',
    ],
  },
  Enigma: {
    category: 'E-commerce full-stack',
    period: 'Perioada de lucru: 2 ani',
    des: 'Enigma (enigma.md) este o platformă e-commerce de lux din Moldova, specializată în parfumerie de nișă, de lux și vintage, cu cutii de descoperire cu mostre, comutare între tema întunecată și cea luminoasă și selecție de arome prin concierge.',
    details: [
      'Am dezvoltat rutine personalizate de catalog Bitrix pentru parfumerie de lux pe mai multe niveluri, cutii cu mostre și prețuri variabile',
      'Am implementat logica client-side de comutare a temelor (întunecat/luminos) și interfețe dinamice de comparare a produselor',
      'Am configurat rutare localizată și suport multilingv (RU/RO) pe paginile de produs și în componentele dinamice',
      'Ca unul dintre dezvoltatorii principali, am supravegheat fiabilitatea site-ului, mentenanța uptime-ului și analiza rapidă a cauzelor erorilor operaționale',
    ],
  },
};
