import type { Dictionary } from './en';

export const ro: Dictionary = {
  nav: {
    home: 'Acasă',
    projects: 'Proiecte',
    contact: 'Contact',
  },
  hero: {
    title: 'Transform ideile în produse reale',
    titleAccentFrom: 3,
    subtitle: 'Salut, sunt Stanislav, dezvoltator web din Moldova.',
    cta: 'Vezi lucrările mele',
  },
  projects: {
    headingLead: 'O mică selecție de',
    headingAccent: 'proiecte recente',
    filterLabel: 'Filtrează după raritate',
    filterAria: 'Filtrează proiectele după culoarea dificultății',
    rarityTooltip: {
      before: 'Raritatea arată cât de dificil a fost proiectul ',
      emphasis: 'pentru mine',
      after:
        ' de construit, pe baza propriei experiențe. Nu este o măsură a dimensiunii sau a complexității generale a proiectului.',
    },
    showAll: 'Arată tot',
    sortAria: 'Sortează proiectele după dificultate',
    sort: {
      default: 'Implicit',
      easiest: 'Cele mai simple primele',
      hardest: 'Cele mai dificile primele',
    },
    empty: 'Momentan nu există proiecte cu această culoare.',
    showMore: 'Arată mai multe ({count})',
    showLess: 'Arată mai puțin',
    slideTo: 'Mergi la proiectul {index}',
    rarity: {
      blue: 'albastru',
      green: 'verde',
      orange: 'portocaliu',
      red: 'roșu',
    },
  },
  card: {
    showMore: 'Afișează mai mult',
    back: 'Înapoi',
    github: 'Vezi GitHub',
    about: 'Despre proiect',
    whatIDid: 'Ce am făcut',
    techStack: 'Tehnologii',
    openWebsite: 'Deschide site-ul {title}',
  },
  approach: {
    headingLead: 'Abordarea',
    headingAccent: 'mea',
    phases: ['Etapa 1', 'Etapa 2', 'Etapa 3'],
    cards: [
      {
        title: 'Planificare și strategie',
        description:
          'Vom colabora pentru a stabili obiectivele site-ului, publicul țintă și funcționalitățile cheie. Vom discuta despre structura site-ului, navigare și cerințele de conținut.',
      },
      {
        title: 'Dezvoltare și raport de progres',
        description:
          'După ce cădem de acord asupra planului, îmi pornesc playlistul de cod și mă apuc de lucru. De la primele schițe până la codul final, te țin la curent pe tot parcursul.',
      },
      {
        title: 'Dezvoltare și lansare',
        description:
          'Aici se întâmplă magia! Pe baza designului aprobat, transform totul în cod funcțional, construind site-ul de la zero.',
      },
    ],
  },
  footer: {
    heading: {
      before: 'Ești gata să duci ',
      emphasis: 'prezența ta',
      after: ' digitală la următorul nivel?',
    },
    text: 'Scrie-mi astăzi și hai să discutăm cum te pot ajuta să-ți atingi obiectivele.',
    cta: 'Hai să vorbim',
    copyright: '© 2024 Stanislav. Toate drepturile rezervate.',
  },
  language: {
    label: 'Limbă',
    change: 'Schimbă limba',
  },
};
