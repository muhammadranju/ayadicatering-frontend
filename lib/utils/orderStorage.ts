export const ORDER_STORAGE_KEY = "user_order_history";
export const RESTRICTION_HOURS = 1;

interface OrderHistory {
  [date: string]: number; // timestamp of when the order was placed
}

/**
 * Save the order timestamp for a specific delivery date
 * This should be called when the user successfully places an order
 */
export const saveOrderTime = (deliveryDate: string) => {
  if (typeof window === "undefined") return;

  try {
    const history: OrderHistory = JSON.parse(
      localStorage.getItem(ORDER_STORAGE_KEY) || "{}"
    );
    
    // Key is the delivery date (YYYY-MM-DD), Value is current timestamp
    history[deliveryDate] = Date.now();

    // Clean up old entries (older than 2 days to keep storage clean)
    const now = Date.now();
    const twoDaysMs = 2 * 24 * 60 * 60 * 1000;
    
    Object.keys(history).forEach(key => {
      if (now - history[key] > twoDaysMs) {
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
export const isOrderAllowedForDate = (deliveryDate: string): { allowed: boolean; remainingMinutes?: number } => {
  if (typeof window === "undefined") return { allowed: true };

  try {
    const history: OrderHistory = JSON.parse(
      localStorage.getItem(ORDER_STORAGE_KEY) || "{}"
    );
    
    const lastOrderTime = history[deliveryDate];
    
    if (!lastOrderTime) return { allowed: true };
    
    const now = Date.now();
    const fiveHoursMs = RESTRICTION_HOURS * 60 * 60 * 1000;
    const timeSinceLastOrder = now - lastOrderTime;
    
    if (timeSinceLastOrder < fiveHoursMs) {
      const remainingMs = fiveHoursMs - timeSinceLastOrder;
      return { 
        allowed: false, 
        remainingMinutes: Math.ceil(remainingMs / (1000 * 60)) 
      };
    }
    
    return { allowed: true };
  } catch (error) {
    console.error("Failed to check order history:", error);
    return { allowed: true };
  }
};
