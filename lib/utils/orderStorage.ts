export const ORDER_STORAGE_KEY = "user_order_history";
export const RESTRICTION_HOURS = 1;

type OrderHistoryEntry = {
  lastOrderAt: number;
  lastTimeSlot?: string;
};

type OrderHistory = {
  [date: string]: OrderHistoryEntry | number;
};

/**
 * Save the order timestamp for a specific delivery date
 * This should be called when the user successfully places an order
 */
export const saveOrderTime = (
  deliveryDate: string,
  timeSlot?: string | null,
) => {
  if (typeof window === "undefined") return;

  try {
    const history: OrderHistory = JSON.parse(
      localStorage.getItem(ORDER_STORAGE_KEY) || "{}",
    );

    const existing = history[deliveryDate];

    const entry: OrderHistoryEntry =
      typeof existing === "object" && existing
        ? {
            lastOrderAt: Date.now(),
            lastTimeSlot: timeSlot ?? existing.lastTimeSlot,
          }
        : {
            lastOrderAt: Date.now(),
            lastTimeSlot: timeSlot ?? undefined,
          };

    history[deliveryDate] = entry;

    // Clean up old entries (older than 2 days to keep storage clean)
    const now = Date.now();
    const twoDaysMs = 2 * 24 * 60 * 60 * 1000;

    Object.keys(history).forEach((key) => {
      const value = history[key];
      const lastOrderAt = typeof value === "number" ? value : value.lastOrderAt;

      if (!lastOrderAt || now - lastOrderAt > twoDaysMs) {
        delete history[key];
      }
    });

    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save order history:", error);
  }
};

/**
 * Check if the user is allowed to place an order for the specific date
 * Returns true if allowed, false if restricted (within 5 hours of previous order)
 */
export const isOrderAllowedForDate = (
  deliveryDate: string,
): { allowed: boolean; remainingMinutes?: number } => {
  if (typeof window === "undefined") return { allowed: true };

  try {
    const history: OrderHistory = JSON.parse(
      localStorage.getItem(ORDER_STORAGE_KEY) || "{}",
    );

    const value = history[deliveryDate];
    const lastOrderTime =
      typeof value === "number"
        ? value
        : value && "lastOrderAt" in value
          ? value.lastOrderAt
          : undefined;

    if (!lastOrderTime) return { allowed: true };

    const now = Date.now();
    const fiveHoursMs = RESTRICTION_HOURS * 60 * 60 * 1000;
    const timeSinceLastOrder = now - lastOrderTime;

    if (timeSinceLastOrder < fiveHoursMs) {
      const remainingMs = fiveHoursMs - timeSinceLastOrder;
      return {
        allowed: false,
        remainingMinutes: Math.ceil(remainingMs / (1000 * 60)),
      };
    }

    return { allowed: true };
  } catch (error) {
    console.error("Failed to check order history:", error);
    return { allowed: true };
  }
};

export const getLastTimeSlotForDate = (deliveryDate: string): string | null => {
  if (typeof window === "undefined") return null;

  try {
    const history: OrderHistory = JSON.parse(
      localStorage.getItem(ORDER_STORAGE_KEY) || "{}",
    );

    const value = history[deliveryDate];

    if (!value || typeof value === "number") return null;

    return value.lastTimeSlot ?? null;
  } catch (error) {
    console.error("Failed to read order history:", error);
    return null;
  }
};
