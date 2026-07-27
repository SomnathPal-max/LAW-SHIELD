export interface SupportResource {
  id: string;
  stateOrUT: string;
  category: 'Police & Emergency' | 'One Stop Center (Sakhi)' | 'Free Legal Aid (DLSA)' | 'Protection Officer (PWDVA)' | 'Women Commission';
  name: string;
  description: string;
  address: string;
  phone: string;
  email?: string;
  operatingHours: string;
  keyServices: string[];
}

export const REGIONAL_SUPPORT_RESOURCES: SupportResource[] = [
  // Delhi
  {
    id: 'delhi-1',
    stateOrUT: 'Delhi',
    category: 'Police & Emergency',
    name: 'Special Police Unit for Women & Children (SPUWAC)',
    description: 'Nodal unit of Delhi Police dedicated to crime against women, safety counseling, and rapid response.',
    address: 'Nanakpura, Moti Bagh, New Delhi - 110021',
    phone: '1091 / 011-24673366',
    email: 'spuwac@delhipolice.gov.in',
    operatingHours: '24/7 Rapid Emergency Response',
    keyServices: ['Zero FIR Registration', 'Emergency PCR Dispatch', 'Women Help Desk', 'Free Counseling']
  },
  {
    id: 'delhi-2',
    stateOrUT: 'Delhi',
    category: 'One Stop Center (Sakhi)',
    name: 'Sakhi One Stop Centre — AIIMS / Safdarjung Campus',
    description: 'Integrated emergency assistance center for women facing violence or medical/legal distress.',
    address: 'Safdarjung Hospital Campus, Ring Road, New Delhi - 110029',
    phone: '011-26102173 / 181',
    operatingHours: '24 Hours / 7 Days a week',
    keyServices: ['Emergency Medical Care', 'Temporary Shelter', 'Police Assistance', 'Psychosocial Counseling']
  },
  {
    id: 'delhi-3',
    stateOrUT: 'Delhi',
    category: 'Free Legal Aid (DLSA)',
    name: 'Delhi State Legal Services Authority (DSLSA)',
    description: 'Statutory body providing free legal representation, advice, and victim compensation.',
    address: 'Central Office, Patiala House Courts Complex, New Delhi - 110001',
    phone: '15100 / 011-23386176',
    email: 'dslsa-phc@nic.in',
    operatingHours: 'Mon - Sat: 10:00 AM - 5:00 PM (Emergency Helpline 24/7)',
    keyServices: ['Free Lawyer Assignment', 'Court Representation', 'Victim Compensation Claims', 'Pre-litigation Mediation']
  },

  // Maharashtra
  {
    id: 'mah-1',
    stateOrUT: 'Maharashtra',
    category: 'Police & Emergency',
    name: 'Mumbai Police Women Safety Cell & Nirbhaya Squad',
    description: 'Specialized mobile response units stationed across Mumbai for instant women safety intervention.',
    address: 'Mumbai Police Commissionerate, Crawford Market, Mumbai - 400001',
    phone: '103 / 112',
    operatingHours: '24/7 Mobile Patrol & Helpline',
    keyServices: ['Nirbhaya Mobile Patrol', 'Immediate Spot Intervention', 'Cyber Stalking Support', 'FIR Lodging Support']
  },
  {
    id: 'mah-2',
    stateOrUT: 'Maharashtra',
    category: 'One Stop Center (Sakhi)',
    name: 'Sakhi One Stop Centre — KEM Hospital Mumbai',
    description: 'Integrated crisis support providing shelter, legal advocacy, and trauma counseling for women.',
    address: 'KEM Hospital Premises, Parel, Mumbai - 400012',
    phone: '022-24107000 / 181',
    operatingHours: '24/7 Emergency Care',
    keyServices: ['Crisis Shelter (up to 5 days)', 'Medical Forensic Exam Support', 'Legal Protection Orders']
  },
  {
    id: 'mah-3',
    stateOrUT: 'Maharashtra',
    category: 'Free Legal Aid (DLSA)',
    name: 'Maharashtra State Legal Services Authority (MSLSA)',
    description: 'Free legal aid services for female litigants across all district and magistrate courts in Maharashtra.',
    address: 'High Court PWD Building, Fort, Mumbai - 400032',
    phone: '022-22691358 / 15100',
    operatingHours: 'Mon - Sat: 10:30 AM - 5:30 PM',
    keyServices: ['Pro Bono Legal Counsel', 'Domestic Violence Petition Filing', 'Maintenance Claims']
  },

  // Karnataka
  {
    id: 'kar-1',
    stateOrUT: 'Karnataka',
    category: 'Police & Emergency',
    name: 'Bengaluru Vanitha Sahayavani (Women Helpline)',
    description: 'Joint initiative of Bengaluru City Police and Parihar NGO providing protection & emergency helpline.',
    address: 'Infantry Road, City Police Commissionerate, Bengaluru - 560001',
    phone: '080-22943225 / 1091 / 112',
    operatingHours: '24/7 Emergency Center',
    keyServices: ['On-site Crisis Resolution', 'Domestic Abuse Counseling', 'Police Protection Orders']
  },
  {
    id: 'kar-2',
    stateOrUT: 'Karnataka',
    category: 'One Stop Center (Sakhi)',
    name: 'Sakhi One Stop Centre — Bowring & Lady Curzon Hospital',
    description: 'Comprehensive relief center for female survivors of domestic, workplace, or physical abuse.',
    address: 'Hospital Road, Shivajinagar, Bengaluru - 560001',
    phone: '080-25591320 / 181',
    operatingHours: '24/7 Operations',
    keyServices: ['Medical Support', 'Police Complaint Filing', 'Legal Aid Representation', 'Emergency Stay']
  },

  // Tamil Nadu
  {
    id: 'tn-1',
    stateOrUT: 'Tamil Nadu',
    category: 'Police & Emergency',
    name: 'All Women Police Station (AWPS) Network — Chennai Central',
    description: 'Specialized police station staffed primarily by female police officers handling women\'s safety complaints.',
    address: 'Kilpauk / Egmore Police Division, Chennai - 600008',
    phone: '044-23452350 / 181',
    operatingHours: '24/7 All Women Station',
    keyServices: ['Female Officer Inquiries', 'FIR Registration', 'Kavalan SOS App Dispatch']
  },
  {
    id: 'tn-2',
    stateOrUT: 'Tamil Nadu',
    category: 'Free Legal Aid (DLSA)',
    name: 'Tamil Nadu State Legal Services Authority (TNSLSA)',
    description: 'Legal aid wing located inside High Court campus offering free legal representation to women.',
    address: 'High Court Campus, Chennai - 600104',
    phone: '044-25342834 / 15100',
    operatingHours: 'Mon - Sat: 10:00 AM - 5:00 PM',
    keyServices: ['Free Legal Advice', 'DV Act Applications', 'POSH Workplace Representation']
  },

  // West Bengal
  {
    id: 'wb-1',
    stateOrUT: 'West Bengal',
    category: 'Police & Emergency',
    name: 'Kolkata Police Women Helpdesk & Winneres Squad',
    description: 'Dedicated all-women police squad patrolling streets and responding to women safety emergencies.',
    address: 'Lalbazar Police Headquarters, 18 Lalbazar Street, Kolkata - 700001',
    phone: '1091 / 033-22143730 / 112',
    operatingHours: '24/7 Operations',
    keyServices: ['Street Safety Patrols', 'Cyber Stalking Action', 'FIR Filing Support']
  },
  {
    id: 'wb-2',
    stateOrUT: 'West Bengal',
    category: 'One Stop Center (Sakhi)',
    name: 'Sakhi One Stop Centre — R.G. Kar Medical College Hospital',
    description: 'Integrated crisis shelter and medical support unit for female survivors.',
    address: 'R.G. Kar Hospital Complex, Belgachia, Kolkata - 700004',
    phone: '033-25557676 / 181',
    operatingHours: '24/7 Emergency Center',
    keyServices: ['Forensic Medical Examination', 'Safe Temporary Shelter', 'Legal Assistance']
  },

  // Uttar Pradesh
  {
    id: 'up-1',
    stateOrUT: 'Uttar Pradesh',
    category: 'Police & Emergency',
    name: 'UP Police Women Power Line 1090 & Mission Shakti',
    description: 'Statewide digital emergency helpline preventing harassment, obscene calls, and physical stalking.',
    address: '1090 Building, Gomti Nagar, Lucknow - 226010',
    phone: '1090 / 112',
    operatingHours: '24/7 Digital Emergency Call Center',
    keyServices: ['Call & Cyber Harassment Action', 'Identity Confidentiality', 'Pink Patrol Dispatch']
  },
  {
    id: 'up-2',
    stateOrUT: 'Uttar Pradesh',
    category: 'One Stop Center (Sakhi)',
    name: 'Sakhi One Stop Centre — KGMU Lucknow',
    description: 'District level Sakhi center offering integrated medical, legal, and shelter aid for women.',
    address: 'King George\'s Medical University Premises, Chowk, Lucknow - 226003',
    phone: '0522-2257540 / 181',
    operatingHours: '24/7 Emergency Services',
    keyServices: ['Police Assistance', 'Psychological Counseling', 'Temporary Stay', 'Legal Advice']
  },

  // Gujarat
  {
    id: 'guj-1',
    stateOrUT: 'Gujarat',
    category: 'Police & Emergency',
    name: 'GVK EMRI 181 Abhayam Women Helpline Gujarat',
    description: 'Statewide 24/7 mobile rescue van and tele-counseling service for women in distress in Gujarat.',
    address: 'Kathwada, Naroda-Dehgam Road, Ahmedabad - 382430',
    phone: '181 / 112',
    operatingHours: '24/7 Rescue Van & Tele-service',
    keyServices: ['On-spot Rescue Vans', 'Immediate Counseling', 'Police Liaison', 'Safe Transport']
  },

  // Telangana
  {
    id: 'tel-1',
    stateOrUT: 'Telangana',
    category: 'Police & Emergency',
    name: 'Telangana Police SHE Teams Headquarters',
    description: 'Specialized undercover police units countering street harassment, stalking, and eve-teasing.',
    address: 'Director General of Police Office, Lakdikapul, Hyderabad - 500004',
    phone: '9490616555 / 112',
    operatingHours: '24/7 Emergency & WhatsApp Line',
    keyServices: ['Undercover Stalking Prevention', 'Evidence Capture', 'Mandatory Harasser Counseling']
  },

  // Rajasthan
  {
    id: 'raj-1',
    stateOrUT: 'Rajasthan',
    category: 'Police & Emergency',
    name: 'Jaipur Police Abhaya Command & Women Safety Cell',
    description: 'Integrated emergency monitoring & quick response team dedicated to women safety.',
    address: 'Police Commissionerate, MI Road, Jaipur - 302001',
    phone: '1090 / 112',
    operatingHours: '24/7 Command Center',
    keyServices: ['Abhaya Patrol Vans', 'Cyber Harassment Help', 'Domestic Abuse Relief']
  },

  // Punjab
  {
    id: 'pb-1',
    stateOrUT: 'Punjab',
    category: 'Police & Emergency',
    name: 'Punjab Police Saanjh Shakti Women Helpline',
    description: 'Community policing wing offering specialized women safety helpdesks across all Punjab districts.',
    address: 'Sector 9, Police Headquarters, Chandigarh / SAS Nagar',
    phone: '112 / 181',
    operatingHours: '24/7 Saanjh Desk',
    keyServices: ['FIR Guidance', 'Family Dispute Mediation', 'Free Protection Orders']
  },

  // Generic / All States fallback template
  {
    id: 'all-1',
    stateOrUT: 'National Support (All States & UTs)',
    category: 'Police & Emergency',
    name: 'Pan-India ERSS Single Emergency System (112)',
    description: 'Unified single emergency response number active across all 28 States and 8 Union Territories in India.',
    address: 'Nearest District Police Control Room (All India)',
    phone: '112',
    operatingHours: '24 Hours / 365 Days',
    keyServices: ['GPS Patrol Dispatch', 'Women Helpline Transfer', 'Ambulance & Fire Support']
  },
  {
    id: 'all-2',
    stateOrUT: 'National Support (All States & UTs)',
    category: 'Free Legal Aid (DLSA)',
    name: 'National Legal Services Authority (NALSA) Helpline',
    description: 'Constitutional legal aid program providing free, assigned lawyers to all female citizens across India.',
    address: 'District Court Complex in every Indian District Headquarters',
    phone: '15100',
    operatingHours: 'Mon - Sat: 9:30 AM - 5:30 PM (Tele-law 24/7)',
    keyServices: ['Free Legal Defense Lawyer', 'Drafting Court Petitions', 'Compensation Claim Assistance']
  },
  {
    id: 'all-3',
    stateOrUT: 'National Support (All States & UTs)',
    category: 'Women Commission',
    name: 'National Commission for Women (NCW) 24/7 Helpline',
    description: 'Statutory body taking direct cognizance of rights violations, domestic abuse, and police apathy.',
    address: 'Plot No. 21, Jasola Institutional Area, New Delhi - 110025',
    phone: '7827170170',
    email: 'ncw@nic.in',
    operatingHours: '24/7 Online & Phone Helpline',
    keyServices: ['Direct Inquiry Cognizance', 'Inter-state Police Liaison', 'Emergency Rehabilitation']
  }
];

export const INDIAN_STATES_AND_UTS = [
  "National Support (All States & UTs)",
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];
