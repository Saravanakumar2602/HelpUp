// src/data/servicesData.js

export const ALL_SERVICES = [
  {
    id: "electrical",
    name: "Electrical",
    iconName: "bolt",
    desc: "Certified electricians for full house wiring, appliance repairs, MCB switchboards, and inverter setup.",
    popular: true,
    startingRate: 350
  },
  {
    id: "plumbing",
    name: "Plumbing",
    iconName: "wrench",
    desc: "Pipe fixes, concealed wall leaks, bathroom sanitary fittings, overhead tank pipelines, and water pumps.",
    popular: true,
    startingRate: 300
  },
  {
    id: "cleaning",
    name: "Home Cleaning",
    iconName: "broom",
    desc: "Deep kitchen descaling, bathroom stain sanitization, sofa steam cleaning, and complete move-in sanitization.",
    popular: true,
    startingRate: 350
  },
  {
    id: "carpentry",
    name: "Carpentry",
    iconName: "hammer",
    desc: "Custom wood shelving, door alignment, wardrobe locks, modular kitchen woodwork, and furniture repair.",
    popular: true,
    startingRate: 350
  },
  {
    id: "tutoring",
    name: "Private Tutoring",
    iconName: "book",
    desc: "Personalized 1-on-1 coaching in CBSE & ICSE Mathematics, Sciences, Languages, and foundational Coding.",
    popular: true,
    startingRate: 400
  },
  {
    id: "painting",
    name: "Painting",
    iconName: "paint",
    desc: "Interior/exterior wall painting, ceiling waterproofing, dampness treatment, and decorative texture finish.",
    popular: true,
    startingRate: 300
  },
  {
    id: "gardening",
    name: "Gardening",
    iconName: "tree",
    desc: "Lawn mowing, terrace garden setup, pest treatment, soil re-potting, and shrub landscaping.",
    popular: false,
    startingRate: 250
  }
];

export const SERVICE_NAMES = [
  "All",
  ...ALL_SERVICES.map(s => s.name)
];
