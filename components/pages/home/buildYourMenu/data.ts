import { MenuItem } from "./types";
// all texts are fixed
const SALADS: MenuItem[] = [
  {
    id: "s1",
    name: "menu.items.salads.s1.name",
    description: "menu.items.salads.s1.desc",
    price: 150,
    category: "salad",
    image: "/items/salad/1.jpg",
  },
  {
    id: "s2",
    name: "menu.items.salads.s2.name",
    description: "menu.items.salads.s2.desc",
    category: "salad",
    price: 150,
    image: "/items/salad/2.jpg",
  },
  {
    id: "s3",
    name: "menu.items.salads.s3.name",
    description: "menu.items.salads.s3.desc",
    category: "salad",
    price: 150,
    image: "/items/salad/3.jpg",
  },
  {
    id: "s4",
    name: "menu.items.salads.s4.name",
    description: "menu.items.salads.s4.desc",
    category: "salad",
    price: 150,
    image: "/items/salad/4.jpg",
  },
];

// all texts are fixed
const CLASSICS: MenuItem[] = [
  {
    id: "c1",
    name: "menu.items.classics.c1.name",
    description: "menu.items.classics.c1.desc",
    category: "appetizer",
    isVegetarian: true,
    price: 180,
    image: "/items/classics/1.jpg",
  },
  {
    id: "c2",
    name: "menu.items.classics.c2.name",
    description: "menu.items.classics.c2.desc",
    category: "appetizer",
    isVegetarian: true,
    price: 180,
    image: "/items/classics/2.jpg",
  },
  {
    id: "c3",
    name: "menu.items.classics.c3.name",
    description: "menu.items.classics.c3.desc",
    category: "appetizer",
    price: 180,
    image: "/items/classics/3.jpg",
  },
  {
    id: "c4",
    name: "menu.items.classics.c4.name",
    description: "menu.items.classics.c4.desc",
    category: "appetizer",
    price: 180,
    image: "/items/classics/4.jpg",
  },
  {
    id: "c5",
    name: "menu.items.classics.c5.name",
    description: "menu.items.classics.c5.desc",
    category: "appetizer",
    price: 180,
    image: "/items/classics/5.jpg",
  },
  {
    id: "c6",
    name: "menu.items.classics.c6.name",
    description: "menu.items.classics.c6.desc",
    category: "appetizer",
    price: 180,
    image: "/items/classics/6.jpg",
  },
];

const SIGNATURES: MenuItem[] = [
  {
    id: "m1",
    name: "menu.items.signatures.m1.name",
    description: "menu.items.signatures.m1.desc",
    category: "main",
    price: 220,
    image: "/items/signature/1.jpg",
  },
  {
    id: "m2",
    name: "menu.items.signatures.m2.name",
    description: "menu.items.signatures.m2.desc",
    category: "main",
    price: 220,
    image: "/items/signature/2.jpg",
  },
  {
    id: "m3",
    name: "menu.items.signatures.m3.name",
    description: "menu.items.signatures.m3.desc",
    category: "main",
    price: 220,
    image: "/items/signature/3.jpg",
  },
  {
    id: "m4",
    name: "menu.items.signatures.m4.name",
    description: "menu.items.signatures.m4.desc",
    category: "main",
    image: "/items/signature/5.jpg",
    price: 220,
  },
  {
    id: "m5",
    name: "menu.items.signatures.m5.name",
    description: "menu.items.signatures.m5.desc",
    category: "main",
    price: 220,
    image: "/items/signature/4.jpg",
  },
  {
    id: "m6",
    name: "menu.items.signatures.m6.name",
    description: "menu.items.signatures.m6.desc",
    category: "main",
    price: 220,
    image: "/items/signature/6.jpg",
  },
  {
    id: "m7",
    name: "menu.items.signatures.m7.name",
    description: "menu.items.signatures.m7.desc",
    price: 220,
    category: "main",
    image: "/items/signature/7.jpg",
  },
  {
    id: "m8",
    name: "menu.items.signatures.m8.name",
    description: "menu.items.signatures.m8.desc",
    category: "main",
    price: 220,
    image: "/items/signature/8.jpg",
  },
  {
    id: "m9",
    name: "menu.items.signatures.m9.name",
    description: "menu.items.signatures.m9.desc",
    category: "main",
    price: 220,
    image: "/items/signature/9.png",
  },
  {
    id: "m10",
    name: "menu.items.signatures.m10.name",
    description: "menu.items.signatures.m10.desc",
    category: "main",
    price: 220,
    image: "/items/signature/10.png",
  },
];

const ADDONS: MenuItem[] = [
  {
    id: "a1",
    name: "menu.items.addons.a1",
    category: "addon",
    price: 50,
  },
  {
    id: "a2",
    name: "menu.items.addons.a2",
    category: "addon",
    price: 50,
  },
  {
    id: "a3",
    name: "menu.items.addons.a3",
    category: "addon",
    price: 50,
  },
  {
    id: "a4",
    name: "menu.items.addons.a4",
    category: "addon",
    relatedItems: SALADS,
    price: 150,
  },
  {
    id: "a5",
    name: "menu.items.addons.a5",
    category: "addon",
    relatedItems: CLASSICS,
    price: 180,
  },
  {
    id: "a6",
    name: "menu.items.addons.a6",
    category: "addon",
    relatedItems: SIGNATURES,
    price: 220,
  },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

const STEPS = [
  "menu.steps.menuSelection",
  "menu.steps.dateTime",
  "menu.steps.delivery",
  "menu.steps.payment",
];

export { SALADS, CLASSICS, SIGNATURES, ADDONS, TIME_SLOTS, STEPS };
