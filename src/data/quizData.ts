export interface QuizQuestion {
  id: string;
  category: 'Workplace (POSH)' | 'Cyber Safety' | 'Domestic Violence' | 'Police & FIR Rights' | 'Criminal Laws (BNS)';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  relevantLaw: string;
}

export const LEGAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Police & FIR Rights',
    question: 'If an incident or offence occurs in one city, but you are currently in a different city or jurisdiction, can a local police station refuse to register your FIR?',
    options: [
      'Yes, you must travel back to the location where the incident took place.',
      'No. The police MUST register a "Zero FIR" and transfer it to the concerned police station.',
      'Yes, unless you have written permission from a District Magistrate.',
      'No, but they can charge you a jurisdictional transfer fee.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Under BNSS Section 173 and Supreme Court directives, police stations CANNOT refuse a complaint on jurisdictional grounds. They must file a "Zero FIR" (numbered 00) and transfer it for investigation. Refusing a Zero FIR is a punishable offence for police officers.',
    relevantLaw: 'BNSS Section 173(1) / Zero FIR Rights'
  },
  {
    id: 'q2',
    category: 'Workplace (POSH)',
    question: 'What is the minimum number of employees an organization or workplace must have to mandate setting up an Internal Committee (IC) under the POSH Act 2013?',
    options: [
      '5 employees',
      '10 employees',
      '50 employees',
      '100 employees'
    ],
    correctAnswerIndex: 1,
    explanation: 'Every workplace with 10 or more employees MUST constitute an Internal Committee (IC) chaired by a senior female employee. Workplaces with fewer than 10 employees fall under the Local Committee (LC) at the district level.',
    relevantLaw: 'POSH Act 2013 Section 4'
  },
  {
    id: 'q3',
    category: 'Workplace (POSH)',
    question: 'Within how many months from the date of the incident should a sexual harassment complaint be submitted to the Internal Committee (IC)?',
    options: [
      '15 days',
      '1 month',
      '3 months (extendable by another 3 months if valid reasons exist)',
      '1 year'
    ],
    correctAnswerIndex: 2,
    explanation: 'The complaint must be filed in writing within 3 months of the incident. The IC can extend this timeframe by up to another 3 months if satisfied that circumstances prevented the woman from filing earlier.',
    relevantLaw: 'POSH Act 2013 Section 9'
  },
  {
    id: 'q4',
    category: 'Domestic Violence',
    question: 'Under the Domestic Violence Act (PWDVA 2005), can a woman be forcibly evicted or thrown out of her shared household by her husband or in-laws during a dispute?',
    options: [
      'Yes, if the house property is legally registered in her in-laws or husband\'s name.',
      'No. Section 17 grants every woman in a domestic relationship the legal right to reside in the shared household regardless of ownership title.',
      'Yes, if she has not contributed financially to the mortgage.',
      'Only if she has lived there for less than 1 year.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Section 17 & 19 of PWDVA 2005 guarantee a woman\'s right to reside in the shared household. A Magistrate can issue a "Residence Order" stopping her husband or in-laws from evicting her, regardless of who owns the property.',
    relevantLaw: 'PWDVA 2005 Section 17 & 19'
  },
  {
    id: 'q5',
    category: 'Police & FIR Rights',
    question: 'Are women in India entitled to FREE legal representation in court, regardless of their financial income?',
    options: [
      'No, free legal aid is only for persons below the poverty line (BPL).',
      'Yes. All women in India are automatically entitled to free legal aid under Section 12 of the Legal Services Authorities Act.',
      'Only if they are senior citizens above 60.',
      'Only in supreme court cases.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Under Section 12(c) of the Legal Services Authorities Act, 1987, all female citizens of India are eligible for FREE legal aid services provided by District Legal Services Authorities (DLSA / NALSA Helpline 15100).',
    relevantLaw: 'Legal Services Authorities Act 1987 Section 12(c)'
  },
  {
    id: 'q6',
    category: 'Cyber Safety',
    question: 'If someone persistently follows you online, monitors your social media activity, or repeatedly sends unwanted messages despite clear disinterest, what crime is being committed?',
    options: [
      'Defamation',
      'Cyberstalking under BNS Section 78 / IPC Section 354D',
      'Simple Breach of Contract',
      'Copying public data (not a crime)'
    ],
    correctAnswerIndex: 1,
    explanation: 'Stalking, including monitoring electronic/internet communications of a woman after she has indicated disinterest, is a criminal offence punishable by up to 3 years imprisonment on first conviction.',
    relevantLaw: 'BNS Section 78 / IPC Section 354D'
  },
  {
    id: 'q7',
    category: 'Criminal Laws (BNS)',
    question: 'Under the Bharatiya Nyaya Sanhita (BNS) 2023, what is Section 69 specifically designed to punish?',
    options: [
      'Public noise pollution',
      'Sexual intercourse induced by deceitful means or a false promise of marriage',
      'Failing to pay office taxes',
      'Trespassing on government property'
    ],
    correctAnswerIndex: 1,
    explanation: 'BNS Section 69 is a new provision introduced in 2023 that specifically penalizes sexual intercourse through deceitful means, such as false identity, fake employment offers, or a fraudulent promise of marriage (up to 10 years imprisonment).',
    relevantLaw: 'BNS 2023 Section 69'
  },
  {
    id: 'q8',
    category: 'Police & FIR Rights',
    question: 'What is the single nationwide emergency response helpline number in India for immediate police, fire, or ambulance assistance?',
    options: [
      '100',
      '108',
      '112',
      '911'
    ],
    correctAnswerIndex: 2,
    explanation: '112 is India\'s unified Emergency Response Support System (ERSS) operating 24/7 across all States and Union Territories for quick police dispatch, women distress, ambulance, and fire services.',
    relevantLaw: 'National ERSS Guidelines (112)'
  }
];
