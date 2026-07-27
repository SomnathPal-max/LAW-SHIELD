export interface DictionaryTerm {
  id: string;
  term: string;
  pronunciation?: string;
  category: 'Criminal Law' | 'Domestic Violence' | 'Workplace' | 'Cyber & Privacy' | 'Procedure';
  shortDefinition: string;
  detailedExplanation: string;
  keyRightsOrTakeaway: string;
  relatedSections?: string;
}

export const LEGAL_DICTIONARY_TERMS: DictionaryTerm[] = [
  {
    id: 'fir',
    term: 'FIR (First Information Report)',
    pronunciation: 'F-I-R',
    category: 'Procedure',
    shortDefinition: 'A written document prepared by police when they receive information about the commission of a cognizable offence.',
    detailedExplanation: 'An FIR sets the process of criminal justice in motion. It can be registered by the victim, a witness, or anyone aware of the crime. Once an FIR is lodged, the police are legally bound to investigate.',
    keyRightsOrTakeaway: 'You have a right to receive a free copy of the FIR immediately after it is registered by the police station.',
    relatedSections: 'BNSS Section 173 / CrPC Section 154'
  },
  {
    id: 'zero-fir',
    term: 'Zero FIR',
    pronunciation: 'Zero F-I-R',
    category: 'Procedure',
    shortDefinition: 'An FIR that can be filed at ANY police station in India, regardless of where the incident took place.',
    detailedExplanation: 'If a crime occurs in one jurisdiction but you approach a police station in another area or city, police CANNOT refuse to record your complaint. They must register a "Zero FIR" (numbered as 00) and transfer it to the appropriate police station.',
    keyRightsOrTakeaway: 'Police officers cannot refuse to register your complaint on jurisdictional grounds. Denying a Zero FIR is a punishable offence for officers.',
    relatedSections: 'BNSS Section 173(1) / Supreme Court Guidelines'
  },
  {
    id: 'cognizable-offence',
    term: 'Cognizable Offence',
    category: 'Procedure',
    shortDefinition: 'A serious crime where police have the legal authority to arrest the accused without a warrant and initiate investigation immediately.',
    detailedExplanation: 'Crimes like rape, outraging modesty, gang rape, stalking, dowry death, and physical assault are cognizable offences under Indian law.',
    keyRightsOrTakeaway: 'In cognizable cases, police must register an FIR without requiring permission from a court magistrate.',
    relatedSections: 'BNSS Section 2(g) / CrPC Section 2(c)'
  },
  {
    id: 'non-cognizable-offence',
    term: 'Non-Cognizable Offence',
    category: 'Procedure',
    shortDefinition: 'A less severe offence where police cannot arrest without a warrant or investigate without a magistrate\'s order.',
    detailedExplanation: 'Offences like simple verbal insult or non-violent defamation are generally non-cognizable. Police record details in a Non-Cognizable Register (NCR) and direct the complainant to approach a magistrate.',
    keyRightsOrTakeaway: 'You can directly petition a magistrate to order a police investigation for non-cognizable offences.',
    relatedSections: 'BNSS Section 2(o) / CrPC Section 2(l)'
  },
  {
    id: 'bns-vs-ipc',
    term: 'BNS (Bharatiya Nyaya Sanhita)',
    category: 'Criminal Law',
    shortDefinition: 'India\'s current official criminal code which replaced the colonial Indian Penal Code (IPC) on July 1, 2024.',
    detailedExplanation: 'BNS reorganized criminal provisions, introduced new offences like deceitful marriage promises, enhanced penalties for sexual violence against women and children, and digitized criminal procedure.',
    keyRightsOrTakeaway: 'Offences committed before July 1, 2024 are tried under IPC sections; offences after July 1, 2024 are prosecuted under BNS sections.',
    relatedSections: 'BNS 2023 (Replaced IPC 1860)'
  },
  {
    id: 'internal-committee',
    term: 'Internal Committee (IC / ICC)',
    category: 'Workplace',
    shortDefinition: 'A mandatory panel in every organization with 10+ employees tasked with handling sexual harassment complaints.',
    detailedExplanation: 'Under the POSH Act 2013, the IC must be chaired by a senior woman employee and must include an external member (from an NGO or legal background). It possesses powers equal to a civil court during inquiries.',
    keyRightsOrTakeaway: 'Complaints can be submitted to the IC within 3 months of the incident. Inquiries must be completed within 90 days.',
    relatedSections: 'POSH Act 2013 Section 4'
  },
  {
    id: 'quid-pro-quo',
    term: 'Quid Pro Quo Harassment',
    category: 'Workplace',
    shortDefinition: 'Workplace sexual harassment where career benefits or job security are conditioned on sexual favors.',
    detailedExplanation: 'Latin for "this for that". It occurs when a supervisor or co-worker demands sexual favors in exchange for hiring, promotion, salary raises, or avoiding termination.',
    keyRightsOrTakeaway: 'An explicit or implicit threat to your employment status in exchange for sexual favors is strictly illegal under Section 3 of the POSH Act.',
    relatedSections: 'POSH Act 2013 Section 3(2)'
  },
  {
    id: 'hostile-work-environment',
    term: 'Hostile Work Environment',
    category: 'Workplace',
    shortDefinition: 'Unwelcome sexual conduct or remarks that create an intimidating, offensive, or hostile atmosphere at work.',
    detailedExplanation: 'Includes sexually colored comments, unwanted touching, displaying offensive imagery, or persistent crude jokes that interfere with a woman\'s work performance or peace of mind.',
    keyRightsOrTakeaway: 'You do not need to prove physical contact or job threat; an uncomfortable, offensive environment is sufficient cause for a POSH complaint.',
    relatedSections: 'POSH Act 2013 Section 3(2)'
  },
  {
    id: 'protection-order',
    term: 'Protection Order',
    category: 'Domestic Violence',
    shortDefinition: 'A court order prohibiting an abuser from committing domestic violence, contacting the victim, or entering her workplace.',
    detailedExplanation: 'Issued by a Magistrate under the Domestic Violence Act (PWDVA 2005) to ensure immediate safety for women in domestic relationships.',
    keyRightsOrTakeaway: 'Violating a Protection Order is a cognizable and non-bailable offence carrying up to 1 year in prison.',
    relatedSections: 'PWDVA 2005 Section 18 & Section 31'
  },
  {
    id: 'residence-order',
    term: 'Residence Order',
    category: 'Domestic Violence',
    shortDefinition: 'A court order safeguarding a woman\'s right to live in her shared household without being illegally thrown out by in-laws or husband.',
    detailedExplanation: 'Under Section 19 of PWDVA, a woman cannot be evicted from her shared household regardless of whether she holds legal title or ownership of the property.',
    keyRightsOrTakeaway: 'Protects victims of domestic abuse from being rendered homeless during legal disputes.',
    relatedSections: 'PWDVA 2005 Section 17 & Section 19'
  },
  {
    id: 'monetary-relief',
    term: 'Monetary Relief & Maintenance',
    category: 'Domestic Violence',
    shortDefinition: 'Court-ordered financial support to cover medical bills, loss of earnings, and daily living expenses caused by domestic abuse.',
    detailedExplanation: 'Magistrates can order abusers to pay monthly maintenance and compensation for physical injury or emotional torture under Section 20 & 22 of PWDVA.',
    keyRightsOrTakeaway: 'Ensures women are financially supported and do not suffer economic hardship due to domestic violence.',
    relatedSections: 'PWDVA 2005 Section 20 & 22'
  },
  {
    id: 'dlsa-free-legal-aid',
    term: 'DLSA (District Legal Services Authority)',
    category: 'Procedure',
    shortDefinition: 'A government body providing free lawyers and legal aid services to women and marginalized citizens.',
    detailedExplanation: 'Under Article 39A and the Legal Services Authorities Act, every woman in India is entitled to FREE legal representation in civil or criminal courts, regardless of her income status.',
    keyRightsOrTakeaway: 'You can access a free, qualified lawyer by dialing 15100 or visiting your local district court DLSA office.',
    relatedSections: 'Legal Services Authorities Act, 1987 Section 12(c)'
  },
  {
    id: 'anticipatory-bail',
    term: 'Anticipatory Bail',
    category: 'Procedure',
    shortDefinition: 'A direction issued by a Sessions Court or High Court granting bail to a person in anticipation of arrest.',
    detailedExplanation: 'When a person apprehends arrest on an accusation of a non-bailable offence, they can apply for anticipatory bail to prevent custodial arrest under specific conditions.',
    keyRightsOrTakeaway: 'Courts evaluate the gravity of offence, victim safety, and risk of witness tampering before considering anticipatory bail.',
    relatedSections: 'BNSS Section 482 / CrPC Section 438'
  },
  {
    id: 'cyberstalking',
    term: 'Cyberstalking & Monitoring',
    category: 'Cyber & Privacy',
    shortDefinition: 'Repeatedly following, monitoring, or contacting a woman through electronic communications despite clear disinterest.',
    detailedExplanation: 'Includes tracking social media, sending unwanted emails/messages, spying via spyware, or creating fake profiles to harass a woman.',
    keyRightsOrTakeaway: 'Punishable under BNS Section 78 and IT Act with up to 3 years imprisonment on first conviction.',
    relatedSections: 'BNS Section 78 / IT Act 2000'
  },
  {
    id: 'voyeurism',
    term: 'Voyeurism',
    category: 'Cyber & Privacy',
    shortDefinition: 'Capturing, viewing, or publishing images of a woman engaged in a private act without her consent.',
    detailedExplanation: 'Applies to situations where a woman reasonably expects privacy (e.g. fitting rooms, restrooms, bedrooms, medical examinations).',
    keyRightsOrTakeaway: 'Both taking the photo/video and circulating it online or via messaging apps are distinct criminal offences.',
    relatedSections: 'BNS Section 77 / IT Act Section 66E'
  }
];
