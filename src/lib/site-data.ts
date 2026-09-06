import logo from "@/assets/logo.jpg.asset.json";
import argentinosCrest from "@/assets/argentinos-crest.jpg.asset.json";
import heroStadium from "@/assets/hero-stadium.jpg";
import journey1 from "@/assets/journey-1.jpg.asset.json";
import journey2 from "@/assets/journey-2.jpg.asset.json";
import journey3 from "@/assets/journey-3.jpg.asset.json";
import train1 from "@/assets/train-1.jpg.asset.json";
import train2 from "@/assets/train-2.jpg.asset.json";
import train3 from "@/assets/train-3.jpg.asset.json";
import train4 from "@/assets/train-4.jpg.asset.json";
import ajVisit from "@/assets/aj-visit.jpg";
import squad1 from "@/assets/squad-1.jpg.asset.json";
import squad2 from "@/assets/squad-2.jpg.asset.json";
import squadWide from "@/assets/squad-wide.jpg.asset.json";
import team1 from "@/assets/team-1.jpg.asset.json";
import team2 from "@/assets/team-2.jpg.asset.json";
import team3 from "@/assets/team-3.jpg.asset.json";
import team4 from "@/assets/team-4.jpg.asset.json";
import team5 from "@/assets/team-5.jpg.asset.json";
import team6 from "@/assets/team-6.jpg.asset.json";
import team7 from "@/assets/team-7.jpg.asset.json";
import team8 from "@/assets/team-8.jpg.asset.json";
import team9 from "@/assets/team-9.jpg.asset.json";

const url = (asset: unknown) => (asset as { url: string }).url;

export const img = {
  logo: url(logo),
  argentinosCrest: url(argentinosCrest),
  hero: heroStadium.src,
  journey: [url(journey1), url(journey2), url(journey3)] as [string, string, string],
  training: [url(train1), url(train2), url(train3), url(train4)] as [string, string, string, string],
  ajVisit: ajVisit.src,
  squad: [url(squad1), url(squad2), url(squadWide)] as [string, string, string],
};

export const club = {
  name: "Malabar Challengers Football Club",
  short: "Malabar Challengers FC",
  abbr: "MCFC",
  foundation: "Malabar Sports & Recreation Foundation",
  tagline: "We create professional footballers",
  kicker: "We are different",
  malayalam: "നമ്മുടെ സ്വന്തം",
  phone: "95 44 95 44 00",
  phoneHref: "+919544954400",
  email: "msrfclt@gmail.com",
  website: "www.malabarchallengersfc.com",
  base: "Kozhikode, Kerala, India",
  hours: "Monday – Saturday · 10:00 AM – 5:00 PM",
};

export const heroStats = [
  { value: "U-20", label: "India team mission" },
  { value: "5 yrs", label: "To the National League" },
  { value: "AJ", label: "Argentinos Juniors partner" },
];

export const visionPillars = [
  {
    title: "Restore",
    body: "Restore Kerala's football prominence and elevate Indian football to international standards.",
    image: img.training[0],
  },
  {
    title: "Promote",
    body: "Promote a vibrant sports culture among youth and foster professionalism across the football industry.",
    image: img.training[1],
  },
  {
    title: "Benchmarks",
    body: "Establish exceptional standards for other clubs and join the National League as a professional team within five years.",
    image: img.training[2],
  },
  {
    title: "Enhance",
    body: "Enhance the overall Indian football ecosystem with a focus on professionalism and excellence.",
    image: img.training[3],
  },
];

export const missionPillars = [
  {
    title: "World class training",
    body: "Establish a world-class grassroots academy to develop and nurture local talent, fostering ownership and community engagement among fans.",
  },
  {
    title: "Top tier coaching",
    body: "Implement top-tier coaching practices tailored to Indian conditions, ensuring the highest standards of training and development.",
  },
  {
    title: "Empowerment",
    body: "Give young boys and girls opportunities to lead productive lives by channelling their creative energy away from negative influences.",
  },
  {
    title: "Comprehensive growth",
    body: "Promote proper nutrition and physical development while encouraging responsible parental involvement in every child's progress.",
  },
];

export const journey = [
  {
    step: "01",
    title: "A child's dream",
    body: "A ten-year-old, passionate about football, is selected into the MCFC Academy.",
    image: img.journey[0],
  },
  {
    step: "02",
    title: "Training",
    body: "The child trains with unwavering dedication, supported by comprehensive coaching at the MCFC Academy.",
    image: img.journey[1],
  },
  {
    step: "03",
    title: "Donning the India jersey",
    body: "That child becomes a member of the U-20 India team competing in the FIFA Cup.",
    image: img.journey[2],
  },
];

export const roadmap = [
  {
    year: "2024",
    title: "Elite coaching staff training",
    body: "Shaping top-tier coaches with cutting-edge, internationally accredited programmes supported by Argentinos Juniors coaches.",
  },
  {
    year: "2024",
    title: "Youth development programme",
    body: "Building tomorrow's football stars through expert youth development pathways.",
  },
  {
    year: "2028",
    title: "Development of professional team",
    body: "Transforming talent into elite professionals through strategic team development.",
  },
  {
    year: "2029",
    title: "Induction into the National League",
    body: "Executing our strategy to propel the team into the National Football League.",
  },
];

export const programs = [
  {
    slug: "grassroots",
    name: "Grassroots Kids Football",
    age: "6 – 10 years",
    description: "A fun-first program introducing ball mastery and football fundamentals.",
    duration: "12 months",
    days: "Tue · Thu · Sat",
    coach: "MCFC grassroots staff",
    benefits: ["Ball mastery fundamentals", "Fun-first coaching", "Nutrition guidance", "Parent progress reports"],
  },
  {
    slug: "youth-development",
    name: "Youth Development Programme",
    age: "11 – 14 years",
    description: "Position-specific training with regular match exposure and video analysis.",
    duration: "12 months",
    days: "Mon · Wed · Fri · Sun",
    coach: "AJ-accredited coaches",
    benefits: ["Position-specific training", "Match exposure", "Video analysis", "Academy scouting pathway"],
  },
  {
    slug: "elite",
    name: "Elite Residential Training",
    age: "15 – 18 years",
    description: "Intensive training with double sessions, strength conditioning, and professional trial pathways.",
    duration: "Season-long",
    days: "Six days a week",
    coach: "MCFC technical director",
    benefits: ["Double sessions", "Strength & conditioning", "Argentina exposure trips", "Professional trial pathway"],
  },
  {
    slug: "goalkeeper",
    name: "Goalkeeper Academy",
    age: "10 – 18 years",
    description: "Specialized training focusing on shot-stopping, distribution, and reaction drills.",
    duration: "6 months",
    days: "Tue · Fri · Sun",
    coach: "Padma Shri Bhramanand S. K. S.",
    benefits: ["Shot-stopping technique", "Distribution & sweeping", "Reaction drills", "One-to-one review"],
  },
  {
    slug: "weekend",
    name: "Weekend Batch",
    age: "8 – 16 years",
    duration: "Rolling monthly",
    days: "Sat · Sun",
    coach: "Academy coaching panel",
    benefits: ["School-friendly timing", "Small-sided games", "Skill assessment", "Progress badges"],
  },
  {
    slug: "fitness",
    name: "Performance & Fitness",
    age: "14 years and above",
    duration: "3 months",
    days: "Mon · Wed · Fri",
    coach: "Sports science team",
    benefits: ["Speed & agility blocks", "Injury prevention", "Recovery protocols", "Body composition tracking"],
  },
];

export const team = [
  {
    name: "John Doe",
    role: "Chairman",
    detail: "Former Chief Secretary to the Government of Goa",
    image: "https://i.pravatar.cc/300?img=11",
  },
  {
    name: "Michael Smith",
    role: "Director",
    detail: "Former Additional Chief Secretary to the Government of Tamil Nadu",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Robert Johnson",
    role: "Director",
    detail: "Former Chief Secretary to the Government of Kerala; currently Chairman, KSIDC",
    image: "https://i.pravatar.cc/300?img=13",
  },
  {
    name: "William Brown",
    role: "Managing Director & CEO",
    detail:
      "Former Superintendent of Police, National Investigation Agency, New Delhi and Kozhikode (Rural) District",
    image: "https://i.pravatar.cc/300?img=14",
  },
  {
    name: "James Wilson",
    role: "Director",
    detail: "Former Commissioner of Income Tax",
    image: "https://i.pravatar.cc/300?img=15",
  },
  {
    name: "Padma Shri Bhramanand S. K. S.",
    role: "Director",
    detail: "Padma Shri & Arjuna awardee; former India football captain and goalkeeper",
    image: url(team6),
  },
  {
    name: "Sajeev Babu Kurup",
    role: "Director",
    detail:
      "Former Indian Ambassador to Guatemala, El Salvador and Honduras; retired Joint Secretary, Ministry of External Affairs",
    image: url(team7),
  },
  {
    name: "T. P. Imbichammad",
    role: "Director",
    detail: "Chairman Emeritus, Avalon Technologies, Chennai",
    image: url(team8),
  },
  {
    name: "Dr. Manoj Kaloor",
    role: "Director",
    detail: "Ayurveda physician, pharma manufacturer and exporter, Kozhikode",
    image: url(team9),
  },
];

export const galleryItems = [
  { src: img.squad[2], category: "Events", caption: "Academy gathering, Kozhikode", wide: true },
  { src: img.ajVisit, category: "Argentina", caption: "Argentinos Juniors delegation visit" },
  { src: img.training[0], category: "Training", caption: "Grassroots session" },
  { src: img.squad[0], category: "Matches", caption: "Match-day squad" },
  { src: img.training[1], category: "Training", caption: "Small-sided games" },
  { src: img.squad[1], category: "Training", caption: "Technical drills" },
  { src: img.training[2], category: "Events", caption: "Academy trials" },
  { src: img.training[3], category: "Matches", caption: "Youth fixture" },
  { src: img.journey[0], category: "Training", caption: "Ball mastery" },
  { src: img.journey[2], category: "Events", caption: "The dream: India colours" },
];

export const galleryCategories = ["All", "Training", "Matches", "Events", "Argentina"] as const;

export const events = [
  {
    title: "Academy Open Trials",
    kind: "Trials",
    date: "2026-09-14T09:00:00",
    place: "MCFC Academy Ground, Kozhikode",
  },
  {
    title: "Argentinos Juniors Coach Clinic",
    kind: "Workshop",
    date: "2026-10-05T16:00:00",
    place: "MSRF Training Centre, Kerala",
  },
  {
    title: "Challengers Youth Cup",
    kind: "Tournament",
    date: "2026-11-22T08:30:00",
    place: "Kozhikode District Stadium",
  },
];

export const partnership = {
  club: "Argentinos Juniors",
  nickname: "Semillero del Mundo — The World's Football Nursery",
  country: "Argentina",
  body: "Renowned for cultivating exceptional football talent and shaping future stars on the global stage. Argentinos Juniors partners MCFC on coach education, methodology and international exposure for our young players.",
  benefits: [
    {
      title: "Coach education",
      body: "Internationally accredited coaching curriculum delivered and audited by AJ staff.",
    },
    {
      title: "Methodology transfer",
      body: "The AJ training model adapted to Indian conditions across every academy age group.",
    },
    {
      title: "Player development",
      body: "Individual development plans, periodised loads and continuous technical review.",
    },
    {
      title: "International exposure",
      body: "Exchange visits, camps and friendly fixtures that put our players on a global stage.",
    },
  ],
};

export const trustPoints = [
  "Founded and governed by retired civil servants of the highest standing",
  "A not-for-profit Section 8 company — every rupee returns to the game",
  "Nutrition, education and welfare tracked alongside football",
  "Transparent progress reporting for every parent",
];
