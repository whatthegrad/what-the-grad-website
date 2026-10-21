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

export const STEPS = [
  { n: '01', title: 'Profile shortlisting', body: 'We look at your grades, goals and budget, then build a shortlist that fits you.' },
  { n: '02', title: 'Country and course', body: 'Which university, which course, which city. We help you choose with your head and your heart.' },
  { n: '03', title: 'Test prep', body: 'IELTS, TOEFL, GRE, GMAT, SAT. A plan that fits around your life.' },
  { n: '04', title: 'Scholarships', body: 'We hunt down merit awards and aid so the money side feels lighter.' },
  { n: '05', title: 'Visa assistance', body: 'Documents, forms and interview prep, until you are holding that stamp.' },
];

export const COUNTRIES: CountryData[] = [
  /* ── USA ─────────────────────────────────────────────────────────── */
  {
    key: 'usa', name: 'USA', full: 'United States', from: 'the US', slug: 'usa',
    intro: 'Big campuses, in demand courses and real work experience after you graduate. Here is the honest version of what studying in the United States looks like, from people who have walked students through it.',
    img: '/images/usa.png',
    tags: ['Masters', 'Bachelors', 'STEM friendly'],
    stats: [
      { big: 'Up to 3 yrs', label: 'Post-study work (STEM)' },
      { big: '1–2 yrs', label: 'Masters duration' },
      { big: 'Rs 30–70 L', label: 'Yearly budget' },
      { big: '3', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'Fall and Spring', small: 'Fall is the main intake and Spring is smaller. Start applying early.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '1 to 2 years', small: 'It depends on the program.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'English test + GRE/GMAT', small: 'It depends on the program.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'F-1 student visa', small: 'Students study on an F-1 visa, backed by an admission document from the uni.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'Work during and after study', small: 'Limited on-campus work is allowed while studying. Post-study work options exist, and STEM graduates get more time.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'Assistantships and merit aid', small: 'They exist but are competitive.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 30 to 70 lakh a year', small: 'The same applies: costs vary by uni and city.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'CS, Data, Engineering, MBA', small: 'Tech, engineering and business lead.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'Mainly Fall', small: 'Fall is the main intake and Spring is rare. Applications open the year before, so start in Class 11.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '4 years', small: 'Most degrees run 4 years, and you can often pick your major in the first 1 to 2 years.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'English test + SAT/ACT (some unis)', small: 'Many unis are test-optional, but some require scores. Check each uni.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'F-1 student visa', small: 'Students study on an F-1 visa, backed by an admission document from the uni.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'Work during and after study', small: 'Limited on-campus work is allowed while studying. Post-study work options exist, and STEM graduates get more time.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'Merit aid', small: 'Merit scholarships exist at many unis. Need-based aid for international students is rare and very competitive.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 30 to 75 lakh a year', small: 'Tuition plus living costs vary a lot by uni and city.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'CS, Engineering, Business, Economics', small: 'Tech, business and the sciences are the most popular.', cap: 'POPULAR FIELDS' },
    ],
  },

  /* ── UK ──────────────────────────────────────────────────────────── */
  {
    key: 'uk', name: 'UK', full: 'United Kingdom', from: 'the UK', slug: 'uk',
    intro: 'One-year masters, globally ranked unis and a clear post-study work route. Here is what studying in the UK actually looks like for Indian students, without the fluff.',
    img: '/images/uk.png',
    tags: ['Masters', 'Bachelors', 'STEM friendly'],
    stats: [
      { big: '2 yrs', label: 'Graduate Route' },
      { big: '1 yr', label: 'Masters duration' },
      { big: 'Rs 28–58 L', label: 'Yearly budget' },
      { big: '3', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'September and January', small: 'September is the main intake. January is smaller and not all courses offer it. A few unis have a May intake too.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '1 year', small: 'Most taught masters are 1 year, which keeps the total cost lower than a 2-year program elsewhere.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'IELTS + GRE/GMAT (some)', small: 'IELTS 6.0 to 7.0 is standard. Some business and engineering programs ask for GRE or GMAT, but many do not.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Student visa', small: 'You need a CAS from your uni to apply. The visa costs around £490 plus a health surcharge of about £776 per year.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '2-year Graduate Route', small: 'After graduating you can stay and work for 2 years on the Graduate Route visa. PhD grads get 3 years.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'Chevening, Commonwealth, uni awards', small: 'Chevening is fully funded but very competitive. Many unis offer their own merit scholarships of £2,000 to £5,000.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 28 to 58 lakh a year', small: 'Depends on the city. London is the most expensive. Outside London you can manage for less.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Data Science, Engineering, Business, Finance', small: 'Tech and business lead. Healthcare and finance are also strong.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'Mainly September', small: 'September is the main intake through UCAS. January entry is rare and limited to certain unis.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '3 years', small: 'Most bachelors degrees in the UK are 3 years, one year shorter than the US or India.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'IELTS', small: 'IELTS 6.0 to 6.5 is typical. No SAT needed. Some courses may have their own entrance tests or interviews.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Student visa', small: 'You need a CAS from your uni to apply. The visa costs around £490 plus a health surcharge of about £776 per year.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '2-year Graduate Route', small: 'After graduating you can stay and work for 2 years on the Graduate Route visa. PhD grads get 3 years.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'GREAT Scholarships, uni merit awards', small: 'GREAT Scholarships are for specific countries. Many unis offer merit discounts of £2,000 to £5,000 per year.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 20 to 40 lakh a year', small: 'Undergraduate tuition is lower than postgrad. Living costs depend heavily on the city.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Data Science, Engineering, Business, Finance', small: 'Tech and business lead. Healthcare and finance are also strong.', cap: 'POPULAR FIELDS' },
    ],
  },

  /* ── France ──────────────────────────────────────────────────────── */
  {
    key: 'france', name: 'France', full: 'France', from: 'France', slug: 'france',
    intro: 'Low tuition at public unis, strong business schools and a post-study work permit built in. France is one of the most affordable options in Europe if you pick the right path.',
    img: '/images/france.png',
    tags: ['Masters', 'Bachelors', 'Affordable'],
    stats: [
      { big: '1–2 yrs', label: 'Post-study work (APS)' },
      { big: '1–2 yrs', label: 'Masters duration' },
      { big: 'Rs 3–25 L', label: 'Tuition per year' },
      { big: '2', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'September and January', small: 'September is the main intake. Some programs, especially at private schools, also start in January.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '1 to 2 years', small: 'Most masters are 2 years at public unis. Grande École and MBA programs are often 1 to 1.5 years.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'IELTS/TOEFL + GMAT (for MBA)', small: 'English-taught programs need IELTS or TOEFL. French-taught ones need DELF/DALF. Business schools may want GMAT.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Long-stay student visa (VLS-TS)', small: 'Applied through Campus France. Once in France, the visa doubles as your residence permit for the first year.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '1 to 2 year APS permit', small: 'After a masters you can apply for the APS (temporary residence permit) to stay and look for work or start a business.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'Eiffel, Charpak, Erasmus+', small: 'The Eiffel Excellence Scholarship is fully funded. Charpak is from the French Embassy in India. Many schools also offer their own awards.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 3 to 25 lakh a year (tuition)', small: 'Public unis charge about Rs 2.5 to 3.5 lakh. Private and Grande École programs go up to Rs 20 to 25 lakh. Living costs are Rs 8 to 15 lakh on top.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Business, AI/Data Science, Engineering, Fashion', small: 'Grande École MBAs, tech and luxury brand management are France's standout programs.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'Mainly September', small: 'September is the standard start. A few private schools offer January entry.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '3 years', small: 'The Licence (French bachelors) is a 3-year program at most public universities.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'IELTS/TOEFL or DELF/DALF', small: 'English programs need IELTS 5.5 to 6.5. French-taught programs need DELF B2 or higher.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Long-stay student visa (VLS-TS)', small: 'Applied through Campus France. Once in France, the visa doubles as your residence permit for the first year.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '1 to 2 year APS permit', small: 'After a masters you can apply for the APS (temporary residence permit) to stay and look for work or start a business.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'Charpak, Erasmus+, uni awards', small: 'Charpak is open to Indian students. Erasmus+ covers exchanges. Some private schools offer early-bird or merit discounts.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 2.5 to 20 lakh a year (tuition)', small: 'Public unis are the cheapest in Europe at about Rs 2.5 to 3.5 lakh. Private schools cost more. Add Rs 8 to 15 lakh for living.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'BBA, Engineering, Design, Culinary Arts', small: 'Business, engineering and design at the bachelors level. Culinary and hospitality programs are also well known.', cap: 'POPULAR FIELDS' },
    ],
  },

  /* ── Spain ───────────────────────────────────────────────────────── */
  {
    key: 'spain', name: 'Spain', full: 'Spain', from: 'Spain', slug: 'spain',
    intro: 'Affordable tuition, a growing international student community and a 1-year post-study work permit. Spain is an underrated pick, especially for business and hospitality.',
    img: '/images/spain.png',
    tags: ['Masters', 'Bachelors', 'Affordable'],
    stats: [
      { big: '1 yr', label: 'Post-study work' },
      { big: '1–2 yrs', label: 'Masters duration' },
      { big: 'Rs 5–25 L', label: 'Tuition per year' },
      { big: '2', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'September and February', small: 'September is the main intake. Some business schools and private unis also start in February.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '1 to 2 years', small: 'Most official masters at public unis are 1 year (60 credits). Some programs at private schools run 1.5 to 2 years.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'IELTS/TOEFL + GMAT (for MBA)', small: 'English-taught programs need IELTS 6.0 to 6.5. Spanish-taught ones may need DELE B2. Top MBA programs ask for GMAT.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Estudiante visa', small: 'Student visa valid for 12 months, renewable each year. Processing takes about 30 to 60 days.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '1-year post-study work permit', small: 'After finishing your course you can get a 12-month permit to look for work. You can convert to a work visa with a job offer.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'University merit awards', small: 'Public unis offer some tuition reductions. Business schools like IE and IESE have their own scholarship programs.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 5 to 25 lakh a year (tuition)', small: 'Public uni masters are the cheapest. Top private business schools cost more. Add Rs 8 to 13 lakh for living costs.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'MBA, Renewable Energy, Hospitality, Architecture', small: 'Spain is known for top business schools (IE, IESE, ESADE), plus hospitality and architecture programs.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'Mainly September', small: 'September is the standard start. February entry is rare at the bachelors level.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '4 years', small: 'Spanish bachelors degrees (Grado) are 4-year programs with 240 ECTS credits.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'IELTS/TOEFL or DELE', small: 'English programs need IELTS 5.5 to 6.0. Spanish-taught courses need DELE B1 or B2.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Estudiante visa', small: 'Student visa valid for 12 months, renewable each year. Processing takes about 30 to 60 days.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '1-year post-study work permit', small: 'After finishing your course you can get a 12-month permit to look for work. You can convert to a work visa with a job offer.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'Limited, mostly uni-level', small: 'Public unis may offer tuition reductions. International scholarship options are fewer for bachelors than masters.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 3 to 15 lakh a year (tuition)', small: 'Public unis charge Rs 3 to 8 lakh. Private unis go higher. Living costs run Rs 8 to 13 lakh depending on the city.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'MBA, Renewable Energy, Hospitality, Architecture', small: 'Spain is known for top business schools (IE, IESE, ESADE), plus hospitality and architecture programs.', cap: 'POPULAR FIELDS' },
    ],
  },

  /* ── Dubai ───────────────────────────────────────────────────────── */
  {
    key: 'dubai', name: 'Dubai', full: 'Dubai, UAE', from: 'Dubai', slug: 'dubai',
    intro: 'Branch campuses of big-name unis, no income tax and a familiar culture for Indian students. Dubai is close to home and growing fast as a study destination.',
    img: '/images/dubai.png',
    tags: ['Masters', 'Bachelors', 'Close to home'],
    stats: [
      { big: '60–120 days', label: 'Job Seeker permit' },
      { big: '1–2 yrs', label: 'Masters duration' },
      { big: 'Rs 13–21 L', label: 'Tuition per year' },
      { big: '3', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'September, January and May', small: 'September is the main intake with the widest choice. January is secondary. Some unis also take students in May to July.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '1 to 2 years', small: 'MBA and taught masters are usually 1 to 2 years depending on the university and program.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'IELTS 6.0–6.5 or MOI letter', small: 'Most campuses accept IELTS or TOEFL. If your previous degree was in English, an MOI certificate from your college may be enough.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Student residence permit', small: 'Your university sponsors the visa. It is valid for 1 year and renewed each year of study.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'Job Seeker permit (60–120 days)', small: 'No automatic post-study work visa. After graduating you can get a Job Seeker entry permit for 60 to 120 days to find a job. Green Visa and Golden Visa are options if eligible.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'University merit waivers (10–50%)', small: 'No UAE government scholarships for internationals. Universities offer merit-based tuition waivers, typically 10% to 50% based on your marks.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 15 to 21 lakh a year (tuition)', small: 'MBA tuition at branch campuses runs Rs 15 to 21 lakh. Add Rs 10 to 15 lakh for living costs depending on your housing choice.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Engineering, CS, MBA, Media, Hospitality', small: 'Branch campuses of BITS Pilani, Manipal and Middlesex offer engineering and business. Media and hospitality are also popular.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'September, January and May', small: 'September has the most options. January and May are smaller windows.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '3 to 4 years', small: 'Most bachelors programs run 3 to 4 years depending on the uni and course.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'IELTS 6.0 or MOI letter', small: 'IELTS or TOEFL is standard. Many campuses also accept an MOI certificate from an English-medium school.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Student residence permit', small: 'Your university sponsors the visa. It is valid for 1 year and renewed each year of study.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'Job Seeker permit (60–120 days)', small: 'No automatic post-study work visa. After graduating you can get a Job Seeker entry permit for 60 to 120 days to find a job. Green Visa and Golden Visa are options if eligible.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'University merit waivers (10–50%)', small: 'Merit-based tuition discounts from individual campuses. Early-application and sibling discounts are also common.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 13 to 16 lakh a year (tuition)', small: 'Tuition at BITS Pilani and Manipal Dubai runs Rs 13 to 16 lakh. Living costs add Rs 10 to 15 lakh depending on housing.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Engineering, CS, MBA, Media, Hospitality', small: 'Branch campuses of BITS Pilani, Manipal and Middlesex offer engineering and business. Media and hospitality are also popular.', cap: 'POPULAR FIELDS' },
    ],
  },

  /* ── Finland ─────────────────────────────────────────────────────── */
  {
    key: 'finland', name: 'Finland', full: 'Finland', from: 'Finland', slug: 'finland',
    intro: 'World-class education, a safe and clean country, and a 2-year post-study work permit. Finland is an underrated gem for students who want quality without the crowd.',
    img: '/images/finland.png',
    tags: ['Masters', 'Bachelors', 'Post-study work'],
    stats: [
      { big: '2 yrs', label: 'Post-study work' },
      { big: '1.5–2 yrs', label: 'Masters duration' },
      { big: 'Rs 8–22 L', label: 'Tuition per year' },
      { big: '2', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'Autumn and January', small: 'Autumn (August/September) is the main intake. A smaller January intake exists for selected programs. Applications open early, usually in January for autumn start.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '1.5 to 2 years', small: 'University masters are 2 years. UAS (applied sciences) masters are 1 to 1.5 years and need some work experience.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'IELTS/TOEFL + entrance exam (some)', small: 'IELTS 6.0 to 6.5 is typical. Some programs also have their own entrance exams, interviews or portfolio reviews.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Residence permit for studies', small: 'Applied online through Enter Finland. Costs about €600. You need to show €800 per month in funds and have health insurance.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '2-year post-study permit', small: 'After graduating you get a 2-year residence permit to look for work or start a business. During studies you can work up to 30 hours a week.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'University tuition waivers', small: 'No government scholarships for degree students. Universities offer tuition waivers or early-bird discounts. These usually cover tuition only, not living.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 8 to 22 lakh a year (tuition)', small: 'Tuition runs €8,000 to €20,000. Living costs add about Rs 10 to 13 lakh per year. Doctoral programs have no tuition.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'IT, AI/Data Science, Engineering, Design', small: 'Finland is strong in tech, sustainability, health tech and design. Aalto and Helsinki are the big names.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'Mainly Autumn', small: 'Autumn (August/September) is the main intake. January start is available for some UAS programs.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '3 to 4.5 years', small: 'University bachelors are 3 years. UAS (applied sciences) bachelors run 3.5 to 4.5 years and include practical training.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'IELTS/TOEFL + entrance exam', small: 'IELTS 6.0 is typical. Most UAS programs have their own entrance exams. Some may accept SAT scores.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Residence permit for studies', small: 'Applied online through Enter Finland. Costs about €600. You need to show €800 per month in funds and have health insurance.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '2-year post-study permit', small: 'After graduating you get a 2-year residence permit to look for work or start a business. During studies you can work up to 30 hours a week.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'University tuition waivers', small: 'Universities offer tuition waivers or early-bird discounts for international students. No government scholarship at this level.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 5 to 18 lakh a year (tuition)', small: 'Tuition runs €6,000 to €18,000. Living costs add about Rs 10 to 13 lakh. Some UAS programs are at the lower end.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'IT, AI/Data Science, Engineering, Design', small: 'Finland is strong in tech, sustainability, health tech and design. Aalto and Helsinki are the big names.', cap: 'POPULAR FIELDS' },
    ],
  },

  /* ── Netherlands ─────────────────────────────────────────────────── */
  {
    key: 'netherlands', name: 'Netherlands', full: 'the Netherlands', from: 'the Netherlands', slug: 'netherlands',
    intro: 'Almost everything is taught in English, the universities rank high globally, and the orientation year visa lets you stay and work after graduating. The Netherlands is a smart, practical choice.',
    img: '/images/netherland.png',
    tags: ['Masters', 'Bachelors', 'English-taught'],
    stats: [
      { big: '1 yr', label: 'Orientation Year visa' },
      { big: '1–2 yrs', label: 'Masters duration' },
      { big: 'Rs 13–28 L', label: 'Tuition per year' },
      { big: '2', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'September and February', small: 'September is the main intake. Some programs also start in February, but choices are fewer.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '1 to 2 years', small: 'Most research university masters are 1 to 2 years. Applied science (HBO) masters are also available.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'IELTS 6.0–7.0', small: 'IELTS or TOEFL is required. Score depends on the program. GMAT may be needed for some business programs.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'MVV + residence permit', small: 'Your university applies for your MVV (entry visa) and residence permit through IND. Processing takes about 30 to 90 days.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '1-year Orientation Year (zoekjaar)', small: 'After graduating you get a 12-month permit to work freely. Can be activated within 3 years of graduating. Converts to a Highly Skilled Migrant permit.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'Holland Scholarship, Orange Tulip', small: 'Holland Scholarship gives €5,000 for the first year. Orange Tulip ranges from €2,000 to full tuition. Both are for non-EU students.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 13 to 28 lakh a year (tuition)', small: 'Research uni masters charge €15,000 to €30,000. Living costs add about Rs 9 to 14 lakh per year.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'CS/AI, Engineering, Business, Logistics', small: 'TU Delft, UvA and Erasmus are top choices. AI, supply chain, agriculture and water management are standout Dutch strengths.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'Mainly September', small: 'September is the standard start. February entry is rare for bachelors programs.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '3 years', small: 'Research university bachelors are 3 years. HBO (applied sciences) programs run 4 years.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'IELTS 6.0–6.5', small: 'IELTS or TOEFL is required. No SAT or entrance exam for most programs.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'MVV + residence permit', small: 'Your university applies for your MVV (entry visa) and residence permit through IND. Processing takes about 30 to 90 days.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '1-year Orientation Year (zoekjaar)', small: 'After graduating you get a 12-month permit to work freely. Can be activated within 3 years of graduating. Converts to a Highly Skilled Migrant permit.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'Holland Scholarship, Orange Tulip', small: 'Holland Scholarship gives €5,000 in the first year. Orange Tulip ranges from partial to full tuition waivers depending on the university.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 7 to 18 lakh a year (tuition)', small: 'Research uni bachelors charge €8,000 to €20,000. HBO programs are lower. Add Rs 9 to 14 lakh for living costs.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'CS/AI, Engineering, Business, Logistics', small: 'TU Delft, UvA and Erasmus are top choices. AI, supply chain, agriculture and water management are standout Dutch strengths.', cap: 'POPULAR FIELDS' },
    ],
  },

  /* ── New Zealand ─────────────────────────────────────────────────── */
  {
    key: 'newzealand', name: 'New Zealand', full: 'New Zealand', from: 'New Zealand', slug: 'new-zealand',
    intro: 'Safe, welcoming and with one of the longest post-study work visas in the world. New Zealand is small but punches above its weight for quality of life and work options after graduation.',
    img: '/images/newzealand.png',
    tags: ['Masters', 'Bachelors', 'Post-study work'],
    stats: [
      { big: 'Up to 3 yrs', label: 'Post-study work' },
      { big: '1–2 yrs', label: 'Masters duration' },
      { big: 'Rs 15–32 L', label: 'Tuition per year' },
      { big: '2', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'February and July', small: 'February is the main intake. July is the mid-year entry. Application deadlines are usually 2 to 3 months before the start.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '1 to 2 years', small: 'Most taught masters are 1 to 1.5 years. Research masters can take up to 2 years.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'IELTS 6.5', small: 'IELTS 6.5 overall with no band below 6.0 is the standard. TOEFL and PTE are also accepted.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Student visa', small: 'Applied online to Immigration NZ with your offer of place, proof of funds, insurance and a medical certificate.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'Up to 3 years post-study work', small: 'Post-study work visa duration depends on your qualification and where you studied. Masters graduates can get up to 3 years.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'NZ Excellence Awards, uni scholarships', small: 'NZ Government offers excellence awards for Indian students. Most universities have their own international merit scholarships too.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 18 to 32 lakh a year', small: 'Tuition plus living costs. Tuition runs Rs 15 to 25 lakh and living adds Rs 9 to 14 lakh depending on the city.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Engineering, IT, MBA, Nursing', small: 'Engineering, IT and business are in demand. Nursing and agriculture are also strong and offer good job prospects.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'February and July', small: 'February is the main start. July is the secondary intake. Plan your application at least 3 to 4 months ahead.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '3 years', small: 'Most bachelors degrees are 3 years. Engineering and some professional degrees may take 4 years.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'IELTS 6.0', small: 'IELTS 6.0 overall is typical for bachelors entry. TOEFL and PTE are also accepted.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Student visa', small: 'Applied online to Immigration NZ with your offer of place, proof of funds, insurance and a medical certificate.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'Up to 3 years post-study work', small: 'Post-study work visa duration depends on your qualification and where you studied. Masters graduates can get up to 3 years.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'NZ Excellence Awards, uni scholarships', small: 'Some universities offer merit scholarships. The NZ government also runs awards specifically for Indian students.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 15 to 28 lakh a year', small: 'Tuition runs Rs 12 to 20 lakh. Living costs add Rs 9 to 14 lakh. Smaller cities are more affordable than Auckland.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Engineering, IT, MBA, Nursing', small: 'Engineering, IT and business are in demand. Nursing and agriculture are also strong and offer good job prospects.', cap: 'POPULAR FIELDS' },
    ],
  },

  /* ── Malta ───────────────────────────────────────────────────────── */
  {
    key: 'malta', name: 'Malta', full: 'Malta', from: 'Malta', slug: 'malta',
    intro: 'English-speaking, sunny and affordable by European standards. Malta is a small island with growing universities and a relaxed lifestyle that Indian students tend to love.',
    img: '/images/malta.png',
    tags: ['Masters', 'Bachelors', 'English-speaking'],
    stats: [
      { big: '1 yr', label: 'Post-study work' },
      { big: '1–2 yrs', label: 'Masters duration' },
      { big: 'Rs 5–14 L', label: 'Tuition per year' },
      { big: '2', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'October and February', small: 'October is the main intake. Some programs also start in February. Check with each uni for exact dates.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '1 to 2 years', small: 'Most masters at the University of Malta are 1 to 2 years depending on the program.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'IELTS (not always required)', small: 'Many Maltese unis do not require IELTS if your previous education was in English. Others accept alternative proof of proficiency.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Type D student visa', small: 'National visa (Type D) for courses over 90 days. Costs about €100. You also need health insurance covering at least €30,000.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'Post-study work visa available', small: 'Malta offers a post-study work visa after graduation. During studies you can work up to 20 hours a week with a work permit.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'Endeavour, Erasmus+, uni merit awards', small: 'Malta Government Scholarship Scheme and Endeavour Scheme exist. Universities also offer merit discounts, especially AUM.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 7 to 14 lakh a year (tuition)', small: 'Tuition at University of Malta runs €8,500 to €15,000. Living costs are about €800 to €1,200 a month (Rs 7 to 11 lakh a year).', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Business, ICT, Engineering, Game Dev', small: 'University of Malta is strong in engineering and medicine. AUM offers game development and design. ICT and finance are growing sectors.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'Mainly October', small: 'October is the standard start at the University of Malta. February entry is possible at some private institutions.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '3 years', small: 'Most bachelors degrees are 3 years. Some professional programs may take longer.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'IELTS (often not required)', small: 'If your school used English as the medium of instruction, many Maltese unis will accept that without IELTS.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Type D student visa', small: 'National visa (Type D) for courses over 90 days. Costs about €100. You also need health insurance covering at least €30,000.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'Post-study work visa available', small: 'Malta offers a post-study work visa after graduation. During studies you can work up to 20 hours a week with a work permit.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'TESS, Erasmus+, uni discounts', small: 'Tertiary Education Scholarships Scheme (TESS) and Erasmus+ are available. Some private unis offer early-bird and merit discounts.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 5 to 14 lakh a year (tuition)', small: 'Tuition ranges from €6,000 to €15,000 depending on the uni. Living costs are lower than most of Western Europe.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Business, ICT, Engineering, Game Dev', small: 'University of Malta is strong in engineering and medicine. AUM offers game development and design. ICT and finance are growing sectors.', cap: 'POPULAR FIELDS' },
    ],
  },

  /* ── Ireland ─────────────────────────────────────────────────────── */
  {
    key: 'ireland', name: 'Ireland', full: 'Ireland', from: 'Ireland', slug: 'ireland',
    intro: 'English-speaking, tech-hub of Europe and a generous 2-year post-study work visa. Ireland is where Google, Meta and most big tech companies have their European HQs, and that matters when you graduate.',
    img: '/images/ireland.png',
    tags: ['Masters', 'Bachelors', 'Tech hub'],
    stats: [
      { big: '2 yrs', label: 'Stamp 1G work visa' },
      { big: '1 yr', label: 'Masters duration' },
      { big: 'Rs 20–33 L', label: 'Tuition per year' },
      { big: '2', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'September and January', small: 'September is the main intake. January is smaller and offered by select unis.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '1 year', small: 'Most taught masters in Ireland are 1 year, similar to the UK. Research masters can take 2 years.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'IELTS 6.5', small: 'IELTS 6.5 overall is standard. TOEFL and PTE are accepted at most unis. No GRE needed for most programs.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Stamp 2 student permission', small: 'Indian students need D-stamp pre-clearance, then register for an Irish Residence Permit (IRP) at €300 per year.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '2-year Stamp 1G (masters)', small: 'Masters graduates get a 24-month Stamp 1G visa to work up to 40 hours a week. Bachelors graduates get 12 months.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'Govt of Ireland, Trinity, UCD awards', small: 'Government of Ireland Scholarship offers full tuition + stipend (very competitive, about 60 awards). Trinity and UCD offer merit reductions.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 20 to 33 lakh a year (tuition)', small: 'Tuition for non-EU masters runs €19,000 to €30,000 depending on the program. Add Rs 10 to 14 lakh for living.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'CS, Data Science, Business, Engineering', small: 'Ireland is Europe's tech capital. CS, data analytics, fintech and pharma are strong. Trinity, UCD and UCC are the top picks.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'Mainly September', small: 'September is the standard start. A few programs offer January entry.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '3 to 4 years', small: 'Arts and business degrees are usually 3 years. Engineering and STEM programs are typically 4 years.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'IELTS 6.0–6.5', small: 'IELTS 6.0 to 6.5 depending on the course. TOEFL and PTE are also accepted.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Stamp 2 student permission', small: 'Indian students need D-stamp pre-clearance, then register for an Irish Residence Permit (IRP) at €300 per year.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '1-year Stamp 1G (bachelors)', small: 'Bachelors graduates get a 12-month Stamp 1G visa. Masters graduates get 24 months. During studies you can work 20 hours a week.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'Govt of Ireland, uni merit awards', small: 'Government of Ireland Scholarship is available but competitive. Universities offer merit-based tuition reductions.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 22 to 33 lakh a year (tuition)', small: 'Non-EU undergraduate tuition runs €22,000 to €30,000 for STEM. Arts and business are slightly lower. Add Rs 10 to 14 lakh for living.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'CS, Data Science, Business, Engineering', small: 'Ireland is Europe's tech capital. CS, data analytics, fintech and pharma are strong. Trinity, UCD and UCC are the top picks.', cap: 'POPULAR FIELDS' },
    ],
  },

  /* ── Hungary ─────────────────────────────────────────────────────── */
  {
    key: 'hungary', name: 'Hungary', full: 'Hungary', from: 'Hungary', slug: 'hungary',
    intro: 'Very affordable tuition, a fully funded government scholarship and a rich student life in Budapest. Hungary is one of the best value-for-money study destinations in Europe.',
    img: '/images/hungary.png',
    tags: ['Masters', 'Bachelors', 'Affordable'],
    stats: [
      { big: '9 months', label: 'Job-search permit' },
      { big: '2 yrs', label: 'Masters duration' },
      { big: 'Rs 3–15 L', label: 'Tuition per year' },
      { big: '2', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'September and February', small: 'September is the main intake. Some programs at major unis also offer a February start.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '2 years', small: 'Most masters programs are 2 years. Medicine (if continuing from bachelors) runs longer.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'IELTS 6.0–6.5', small: 'IELTS 6.0 for most programs, 6.5 for medical programs. TOEFL is also accepted. No GRE required.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Type D student visa', small: 'Long-stay visa applied at the Hungarian embassy. Processing takes 30 to 60 days. You need to show about €6,000 per year in funds.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '9-month job-search permit', small: 'After graduating you get a 9-month residence permit to find a job. Once employed, you switch to a work permit.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'Stipendium Hungaricum (fully funded)', small: 'Covers full tuition, a monthly stipend of about €580 and free university housing. Applications go through India's Ministry of Education by January.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 3 to 15 lakh a year (tuition)', small: 'Tuition runs €4,000 to €17,000 depending on the field. Living costs in Budapest are about €500 to €750 a month (Rs 5 to 8 lakh a year).', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Medicine, Engineering, IT, Business', small: 'Hungary is well known for medicine (Semmelweis is a top choice). Engineering, IT and business at Debrecen and BME are also strong.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'Mainly September', small: 'September is the main intake. February entry is available at some universities.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '3 to 4 years', small: 'Most bachelors are 3 to 3.5 years. Medicine (MBBS equivalent) is a 6-year integrated program.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'IELTS 5.5–6.0', small: 'IELTS 5.5 to 6.0 for most programs. Medical programs usually ask for 6.0 or higher.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Type D student visa', small: 'Long-stay visa applied at the Hungarian embassy. Processing takes 30 to 60 days. You need to show about €6,000 per year in funds.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: '9-month job-search permit', small: 'After graduating you get a 9-month residence permit to find a job. Once employed, you switch to a work permit.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'Stipendium Hungaricum (fully funded)', small: 'Available for bachelors too. Covers tuition, stipend and dorm. About 200+ Indian students win it each year across all levels.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 3 to 12 lakh a year (tuition)', small: 'Tuition runs €4,000 to €12,000 for non-medical programs. Medical programs cost more. Living is very affordable at €500 to €750 a month.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Medicine, Engineering, IT, Business', small: 'Hungary is well known for medicine (Semmelweis is a top choice). Engineering, IT and business at Debrecen and BME are also strong.', cap: 'POPULAR FIELDS' },
    ],
  },

  /* ── Armenia ─────────────────────────────────────────────────────── */
  {
    key: 'armenia', name: 'Armenia', full: 'Armenia', from: 'Armenia', slug: 'armenia',
    intro: 'Very low tuition, a simple visa process and a growing number of English-taught programs. Armenia is a budget-friendly option that is especially popular for medicine.',
    img: '/images/armenia.png',
    tags: ['Masters', 'Bachelors', 'Budget-friendly'],
    stats: [
      { big: '$1.5–6K', label: 'Tuition per year' },
      { big: '2 yrs', label: 'Masters duration' },
      { big: 'Rs 4–10 L', label: 'Yearly budget' },
      { big: '2', label: 'Available intakes' },
    ],
    mastersFacts: [
      { pill: 'MASTERS', icon: ICONS.intakes, big: 'September and February', small: 'September is the main intake. Some programs also start in February. Applications are usually due 1 to 2 months before.', cap: 'INTAKES' },
      { pill: 'MASTERS', icon: ICONS.duration, big: '2 years', small: 'Most masters programs are 2 years. Some specialized programs may differ.', cap: 'DURATION' },
      { pill: 'MASTERS', icon: ICONS.tests, big: 'IELTS/TOEFL for English programs', small: 'English-taught programs need IELTS or TOEFL. Armenian-taught programs may need Armenian language proficiency. Some have entrance exams.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Student visa', small: 'Applied at the Armenian embassy after receiving your admission letter. The process is straightforward and relatively quick.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'Work visa with job offer', small: 'No automatic post-study work visa. You can work part-time during studies with a permit. After graduating, you need a job offer for a work visa.', cap: 'WORK AFTER STUDY' },
      { pill: 'MASTERS', icon: ICONS.scholarships, big: 'Armenian Govt, AUA scholarships', small: 'Armenian Government Scholarship is fully funded for select countries. American University of Armenia (AUA) offers its own merit scholarships.', cap: 'SCHOLARSHIPS' },
      { pill: 'MASTERS', icon: ICONS.budget, big: 'Rs 1.5 to 5 lakh a year (tuition)', small: 'Tuition is $2,000 to $6,000. Living costs are very low at $480 to $1,170 a month. Total yearly budget can be as low as Rs 4 to 10 lakh.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Medicine, CS, Business, Engineering', small: 'Armenia is popular for medicine (MBBS). CS, business and international relations at AUA are also well regarded.', cap: 'POPULAR FIELDS' },
    ],
    bachelorsFacts: [
      { pill: 'BACHELORS', icon: ICONS.intakes, big: 'Mainly September', small: 'September is the main start. February intake is available at some universities.', cap: 'INTAKES' },
      { pill: 'BACHELORS', icon: ICONS.duration, big: '4 years', small: 'Most bachelors programs are 4 years. Medicine runs 5 to 6 years.', cap: 'DURATION' },
      { pill: 'BACHELORS', icon: ICONS.tests, big: 'IELTS/TOEFL for English programs', small: 'English-taught programs need IELTS or TOEFL. Some universities have their own entrance exams.', cap: 'TESTS' },
      { pill: 'BOTH LEVELS', icon: ICONS.visa, big: 'Student visa', small: 'Applied at the Armenian embassy after receiving your admission letter. The process is straightforward and relatively quick.', cap: 'VISA' },
      { pill: 'BOTH LEVELS', icon: ICONS.work, big: 'Work visa with job offer', small: 'No automatic post-study work visa. You can work part-time during studies with a permit. After graduating, you need a job offer for a work visa.', cap: 'WORK AFTER STUDY' },
      { pill: 'BACHELORS', icon: ICONS.scholarships, big: 'Armenian Govt, Aurora, AUA awards', small: 'Armenian Government Scholarship and Aurora Gratitude Scholarship are available. AUA offers merit-based aid.', cap: 'SCHOLARSHIPS' },
      { pill: 'BACHELORS', icon: ICONS.budget, big: 'Rs 1.2 to 4 lakh a year (tuition)', small: 'Tuition is $1,500 to $5,000. Living costs run $480 to $1,170 a month. One of the most affordable destinations anywhere.', cap: 'BUDGET' },
      { pill: 'BOTH LEVELS', icon: ICONS.fields, big: 'Medicine, CS, Business, Engineering', small: 'Armenia is popular for medicine (MBBS). CS, business and international relations at AUA are also well regarded.', cap: 'POPULAR FIELDS' },
    ],
  },
];

export function getCountryBySlug(slug: string): CountryData | undefined {
  return COUNTRIES.find(c => c.slug === slug);
}

export function getAllCountrySlugs(): string[] {
  return COUNTRIES.map(c => c.slug);
}
