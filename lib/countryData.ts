/* ------------------------------------------------------------------ */
/*  Country data — shared between server (page.tsx) and client         */
/*  (CountryPage.tsx). No 'use client' directive here.                 */
/* ------------------------------------------------------------------ */

export type FactCard = {
  pill: string;
  icon: string;
  big: string;
  small: string;
  cap: string;
};

export type CountryData = {
  key: string;
  name: string;
  full: string;
  from: string;
  slug: string;
  intro: string;
  img: string;
  tags: string[];
  stats: { big: string; label: string }[];
  mastersFacts: FactCard[];
  bachelorsFacts: FactCard[];
};

// SVG icon paths for fact cards
export const ICONS = {
  intakes:      'M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 10h16M8 3v4M16 3v4',
  duration:     'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM12 8v4l3 2',
  tests:        'M4 20l4-1 11-11-3-3L5 16l-1 4zM14 6l3 3',
  visa:         'M7 3h8l4 4v14H7zM15 3v4h4M10 13l2 2 3-4',
  work:         'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  scholarships: 'M2 9l10-5 10 5-10 5zM6 11v5c3 3 9 3 12 0v-5',
  budget:       'M4 7h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 7l3-3h9M16 13h2',
  fields:       'M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1zM12 6v13',
};

function makePlaceholderFacts(countryName: string, level: 'masters' | 'bachelors'): FactCard[] {
  const m = level === 'masters';
  const lvl = m ? 'MASTERS' : 'BACHELORS';
  const both = 'BOTH LEVELS';
  const ph = (label: string) => `[Add ${label}]`;
  return [
    { pill: lvl, icon: ICONS.intakes, big: ph('intakes'), small: `${ph('which months, and what to know')} for ${countryName}.`, cap: 'INTAKES' },
    { pill: lvl, icon: ICONS.duration, big: ph('course length'), small: `${ph(`typical ${m ? 'masters' : 'bachelors'} duration`)}.`, cap: 'DURATION' },
    { pill: lvl, icon: ICONS.tests, big: ph('tests needed'), small: `${ph('English test and entrance test details')}.`, cap: 'TESTS' },
    { pill: both, icon: ICONS.visa, big: ph('visa type'), small: `${ph('how the student visa works')}.`, cap: 'VISA' },
    { pill: both, icon: ICONS.work, big: ph('work rights'), small: `${ph('post study work details')}.`, cap: 'WORK AFTER STUDY' },
    { pill: lvl, icon: ICONS.scholarships, big: ph('scholarship type'), small: `${ph('funding and scholarship details')}.`, cap: 'SCHOLARSHIPS' },
    { pill: lvl, icon: ICONS.budget, big: '[Rs X to Y lakh a year]', small: `${ph('tuition and living cost notes')}.`, cap: 'BUDGET' },
    { pill: both, icon: ICONS.fields, big: ph('popular fields'), small: `${ph(`strongest courses in ${countryName}`)}.`, cap: 'POPULAR FIELDS' },
  ];
}

export const STEPS = [
  { n: '01', title: 'Profile shortlisting', body: 'We look at your grades, goals and budget, then build a shortlist that fits you.' },
  { n: '02', title: 'Country and course', body: 'Which university, which course, which city. We help you choose with your head and your heart.' },
  { n: '03', title: 'Test prep', body: 'IELTS, TOEFL, GRE, GMAT, SAT. A plan that fits around your life.' },
  { n: '04', title: 'Scholarships', body: 'We hunt down merit awards and aid so the money side feels lighter.' },
  { n: '05', title: 'Visa assistance', body: 'Documents, forms and interview prep, until you are holding that stamp.' },
];

export const COUNTRIES: CountryData[] = [
  {
    key: 'usa', name: 'USA', full: 'United States', from: 'the US', slug: 'usa',
    intro: 'Big campuses, in demand courses and real work experience after you graduate. Here is the honest version of what studying in the United States looks like, from people who have walked students through it.',
    img: '/images/usa.png',
    tags: ['Masters', 'Bachelors', 'STEM friendly'],
    stats: [
      { big: '[XX%]', label: 'Admit rate' },
      { big: 'Up to 3 yrs', label: 'Post-study work (STEM)' },
      { big: '[Rs XX L+]', label: 'Scholarships' },
      { big: '3', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'Fall and Spring', small: 'Fall (Aug / Sep) has the most options. Spring (Jan) is available at many universities too.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '1 to 2 years', small: 'Most taught masters run 1 to 2 years. Research tracks can run longer.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'English test + GRE or GMAT', small: 'IELTS, TOEFL or Duolingo for almost everyone. GRE or GMAT depends on the course and university.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'F-1 student visa', small: 'You get your acceptance, then the visa interview. We prep your documents and your answers.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'OPT work window', small: 'Work in the US after you graduate, with a longer window for STEM degrees. A big reason people pick the USA.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'Assistantships and merit aid', small: 'Departmental funding, assistantships and merit awards are common at masters level. We help you find the ones you can win.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: '[Rs X to Y lakh a year]', small: 'Tuition plus living, depending on city and university. Add your real range here.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'STEM, business, design', small: 'Computer science, data, engineering, business, health sciences, design and media.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'Fall is the main intake', small: 'Most bachelors students start in Fall (Aug / Sep). Some universities also take Spring (Jan).', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '4 years', small: 'A full undergraduate degree, with room to explore before you pick a major.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'English test + SAT or ACT', small: 'IELTS, TOEFL or Duolingo plus SAT or ACT. Many universities are test optional, so we check each one.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'F-1 student visa', small: 'You get your acceptance, then the visa interview. We prep your documents and your answers.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'OPT work window', small: 'Work in the US after you graduate, with a longer window for STEM degrees. A big reason people pick the USA.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'Merit and need based aid', small: 'Merit scholarships and need based aid at undergraduate level. We help you find the ones you can actually win.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: '[Rs X to Y lakh a year]', small: 'Tuition plus living, depending on city and university. Add your real range here.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'STEM, business, design', small: 'Computer science, data, engineering, business, health sciences, design and media.', cap: 'POPULAR FIELDS' },
    ],
  },
  { key: 'uk', name: 'UK', full: 'United Kingdom', from: 'the UK', slug: 'uk', intro: '[Add a two line intro about studying in the United Kingdom, in the elder sibling voice.]', img: '/images/uk.png', tags: ['Masters', 'Bachelors', 'STEM friendly'], stats: [{ big: '[XX%]', label: 'Admit rate' }, { big: '[X yrs]', label: 'Post-study work' }, { big: '[Rs XX L+]', label: 'Scholarships' }, { big: '[X]', label: 'Available intakes' }], mastersFacts: makePlaceholderFacts('UK', 'masters'), bachelorsFacts: makePlaceholderFacts('UK', 'bachelors') },
  { key: 'france', name: 'France', full: 'France', from: 'France', slug: 'france', intro: '[Add a two line intro about studying in France, in the elder sibling voice.]', img: '/images/france.png', tags: ['Masters', 'Bachelors', 'Affordable'], stats: [{ big: '[XX%]', label: 'Admit rate' }, { big: '[X yrs]', label: 'Post-study work' }, { big: '[Rs XX L+]', label: 'Scholarships' }, { big: '[X]', label: 'Available intakes' }], mastersFacts: makePlaceholderFacts('France', 'masters'), bachelorsFacts: makePlaceholderFacts('France', 'bachelors') },
  { key: 'spain', name: 'Spain', full: 'Spain', from: 'Spain', slug: 'spain', intro: '[Add a two line intro about studying in Spain, in the elder sibling voice.]', img: '/images/spain.png', tags: ['Masters', 'Bachelors'], stats: [{ big: '[XX%]', label: 'Admit rate' }, { big: '[X yrs]', label: 'Post-study work' }, { big: '[Rs XX L+]', label: 'Scholarships' }, { big: '[X]', label: 'Available intakes' }], mastersFacts: makePlaceholderFacts('Spain', 'masters'), bachelorsFacts: makePlaceholderFacts('Spain', 'bachelors') },
  { key: 'dubai', name: 'Dubai', full: 'Dubai, UAE', from: 'Dubai', slug: 'dubai', intro: '[Add a two line intro about studying in Dubai, UAE, in the elder sibling voice.]', img: '/images/dubai.png', tags: ['Masters', 'Bachelors'], stats: [{ big: '[XX%]', label: 'Admit rate' }, { big: '[X yrs]', label: 'Post-study work' }, { big: '[Rs XX L+]', label: 'Scholarships' }, { big: '[X]', label: 'Available intakes' }], mastersFacts: makePlaceholderFacts('Dubai', 'masters'), bachelorsFacts: makePlaceholderFacts('Dubai', 'bachelors') },
  { key: 'finland', name: 'Finland', full: 'Finland', from: 'Finland', slug: 'finland', intro: '[Add a two line intro about studying in Finland, in the elder sibling voice.]', img: '/images/finland.png', tags: ['Masters', 'Bachelors', 'Low tuition'], stats: [{ big: '[XX%]', label: 'Admit rate' }, { big: '[X yrs]', label: 'Post-study work' }, { big: '[Rs XX L+]', label: 'Scholarships' }, { big: '[X]', label: 'Available intakes' }], mastersFacts: makePlaceholderFacts('Finland', 'masters'), bachelorsFacts: makePlaceholderFacts('Finland', 'bachelors') },
  { key: 'netherlands', name: 'Netherlands', full: 'the Netherlands', from: 'the Netherlands', slug: 'netherlands', intro: '[Add a two line intro about studying in the Netherlands, in the elder sibling voice.]', img: '/images/netherland.png', tags: ['Masters', 'Bachelors'], stats: [{ big: '[XX%]', label: 'Admit rate' }, { big: '[X yrs]', label: 'Post-study work' }, { big: '[Rs XX L+]', label: 'Scholarships' }, { big: '[X]', label: 'Available intakes' }], mastersFacts: makePlaceholderFacts('Netherlands', 'masters'), bachelorsFacts: makePlaceholderFacts('Netherlands', 'bachelors') },
  { key: 'newzealand', name: 'New Zealand', full: 'New Zealand', from: 'New Zealand', slug: 'new-zealand', intro: '[Add a two line intro about studying in New Zealand, in the elder sibling voice.]', img: '/images/newzealand.png', tags: ['Masters', 'Bachelors'], stats: [{ big: '[XX%]', label: 'Admit rate' }, { big: '[X yrs]', label: 'Post-study work' }, { big: '[Rs XX L+]', label: 'Scholarships' }, { big: '[X]', label: 'Available intakes' }], mastersFacts: makePlaceholderFacts('New Zealand', 'masters'), bachelorsFacts: makePlaceholderFacts('New Zealand', 'bachelors') },
  { key: 'malta', name: 'Malta', full: 'Malta', from: 'Malta', slug: 'malta', intro: '[Add a two line intro about studying in Malta, in the elder sibling voice.]', img: '/images/malta.png', tags: ['Masters', 'Bachelors'], stats: [{ big: '[XX%]', label: 'Admit rate' }, { big: '[X yrs]', label: 'Post-study work' }, { big: '[Rs XX L+]', label: 'Scholarships' }, { big: '[X]', label: 'Available intakes' }], mastersFacts: makePlaceholderFacts('Malta', 'masters'), bachelorsFacts: makePlaceholderFacts('Malta', 'bachelors') },
  { key: 'ireland', name: 'Ireland', full: 'Ireland', from: 'Ireland', slug: 'ireland', intro: '[Add a two line intro about studying in Ireland, in the elder sibling voice.]', img: '/images/ireland.png', tags: ['Masters', 'Bachelors'], stats: [{ big: '[XX%]', label: 'Admit rate' }, { big: '[X yrs]', label: 'Post-study work' }, { big: '[Rs XX L+]', label: 'Scholarships' }, { big: '[X]', label: 'Available intakes' }], mastersFacts: makePlaceholderFacts('Ireland', 'masters'), bachelorsFacts: makePlaceholderFacts('Ireland', 'bachelors') },
  { key: 'hungary', name: 'Hungary', full: 'Hungary', from: 'Hungary', slug: 'hungary', intro: '[Add a two line intro about studying in Hungary, in the elder sibling voice.]', img: '/images/hungary.png', tags: ['Masters', 'Bachelors'], stats: [{ big: '[XX%]', label: 'Admit rate' }, { big: '[X yrs]', label: 'Post-study work' }, { big: '[Rs XX L+]', label: 'Scholarships' }, { big: '[X]', label: 'Available intakes' }], mastersFacts: makePlaceholderFacts('Hungary', 'masters'), bachelorsFacts: makePlaceholderFacts('Hungary', 'bachelors') },
  { key: 'armenia', name: 'Armenia', full: 'Armenia', from: 'Armenia', slug: 'armenia', intro: '[Add a two line intro about studying in Armenia, in the elder sibling voice.]', img: '/images/armenia.png', tags: ['Masters', 'Bachelors'], stats: [{ big: '[XX%]', label: 'Admit rate' }, { big: '[X yrs]', label: 'Post-study work' }, { big: '[Rs XX L+]', label: 'Scholarships' }, { big: '[X]', label: 'Available intakes' }], mastersFacts: makePlaceholderFacts('Armenia', 'masters'), bachelorsFacts: makePlaceholderFacts('Armenia', 'bachelors') },
];

export function getCountryBySlug(slug: string): CountryData | undefined {
  return COUNTRIES.find(c => c.slug === slug);
}

export function getAllCountrySlugs(): string[] {
  return COUNTRIES.map(c => c.slug);
}
