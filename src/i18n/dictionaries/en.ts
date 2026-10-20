export const en = {
  nav: {
    home: 'Home',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    title: 'Transforming Ideas into Real Products',
    /** Words before this index render in black, the rest in purple. */
    titleAccentFrom: 4,
    subtitle: "Hello, I'm Stanislav, a Web developer based in Moldova.",
    cta: 'Show my works',
  },
  projects: {
    headingLead: 'A small selection of',
    headingAccent: 'recent projects',
    filterLabel: 'Filter by rarity',
    filterAria: 'Filter projects by difficulty color',
    rarityTooltip: {
      before: 'Rarity shows how hard the project was ',
      emphasis: 'for me',
      after:
        " to build, based on my own experience. It's not a measure of how big or complex the project is overall.",
    },
    showAll: 'Show all',
    sortAria: 'Sort projects by difficulty',
    sort: {
      default: 'Default',
      easiest: 'Easiest first',
      hardest: 'Hardest first',
    },
    empty: 'No projects with this color yet.',
    showMore: 'Show more ({count})',
    showLess: 'Show less',
    rarity: {
      blue: 'blue',
      green: 'green',
      orange: 'orange',
      red: 'red',
    },
  },
  card: {
    showMore: 'Show more',
    back: 'Back',
    github: 'Check GitHub',
    about: 'About the project',
    whatIDid: 'What I did',
    techStack: 'Tech stack',
    openWebsite: 'Open {title} website',
  },
  approach: {
    headingLead: 'My',
    headingAccent: 'approach',
    phases: ['Phase 1', 'Phase 2', 'Phase 3'],
    cards: [
      {
        title: 'Planning & Strategy',
        description:
          "We'll collaborate to map out your website's goals, target audience, and key functionalities. We'll discuss things like site structure, navigation, and content requirements.",
      },
      {
        title: 'Development & Progress Update',
        description:
          'Once we agree on the plan, I cue my coding playlist and dive into coding. From initial sketches to polished code, I keep you updated all the way.',
      },
      {
        title: 'Development & Launch',
        description:
          "This is where the magic happens! Based on the approved design, I'll translate everything into functional code, building your website from the ground up.",
      },
    ],
  },
  footer: {
    heading: {
      before: 'Ready to take ',
      emphasis: 'your',
      after: ' digital presence to the next level?',
    },
    text: "Reach out to me today and let's discuss how I can help you achieve your goals.",
    cta: "Let's get in touch",
    copyright: 'Copyright © 2024 Stanislav',
  },
  language: {
    label: 'Language',
    change: 'Change language',
  },
};

export type Dictionary = typeof en;
