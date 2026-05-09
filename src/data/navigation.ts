import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

// Hermanos Cars navigation — clean, car-rental specific
export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/fr",
    name: "Accueil",
  },
  {
    id: ncNanoId(),
    href: "/fr/fleet",
    name: "Notre Flotte",
  },
  {
    id: ncNanoId(),
    href: "/fr/about",
    name: "À Propos",
  },
  {
    id: ncNanoId(),
    href: "/fr/contact",
    name: "Contact",
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = NAVIGATION_DEMO;
