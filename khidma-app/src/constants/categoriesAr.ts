/** Egyptian Arabic service categories — stored in DB as `category_key` + `label_ar` */
export type CategoryKeyAr = "sabaka" | "kahramai" | "naqasha" | "nagara" | "takyif";

export interface ServiceCategoryAr {
  key: CategoryKeyAr;
  /** Egyptian Arabic label (Ammiya) */
  labelAr: string;
  /** Short hint for workers */
  hintAr: string;
  icon: string;
}

export const SERVICE_CATEGORIES_AR: ServiceCategoryAr[] = [
  { key: "sabaka", labelAr: "سباكة", hintAr: "سباك", icon: "🔧" },
  { key: "kahramai", labelAr: "كهرباء", hintAr: "كهربائي", icon: "⚡" },
  { key: "naqasha", labelAr: "نقاشة", hintAr: "نقاش", icon: "🎨" },
  { key: "nagara", labelAr: "نجارة", hintAr: "نجار", icon: "🪚" },
  { key: "takyif", labelAr: "تكييف", hintAr: "فني تكييف", icon: "❄️" }
];
