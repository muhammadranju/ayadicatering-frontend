export interface MenuItem {
  id: string;
  name: string;
  nameArabic?: string;

  description?: string;
  descriptionArabic?: string;
  price?: number;
  image?: string;
  category: "salad" | "appetizer" | "main" | "addon" | "starter" | "dessert";
  isVegetarian?: boolean;
  relatedItems?: MenuItem[];

  platterName?: string;
  platterNameArabic?: string;
  isAvailable?: boolean;
}

export interface MenuSectionProps {
  title: string;
  subtitle: string;
  items: MenuItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  maxSelection?: number;
  type: "single" | "multi";
}

export interface OrderState {
  salad: string | null;
  appetizers: string[];
  mains: string[];
  addons: string[];
}

export interface DeliveryDetails {
  name: string;
  street: string;
  city: string;
  area: string;
  region?: string;
  country?: string;
  postalCode?: string;
  whatsapp: string;
  email: string;
  note: string;
}
