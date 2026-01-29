export interface TimeSlot {
  startTime: string;
  endTime: string;
  isBlocked: boolean;
  blockedReason?: string;
  maxCapacity?: number;
  currentBookings?: number;
}

export interface DeliverySlot {
  _id: string;
  date: string;
  timeSlots: TimeSlot[];
  isFullDayBlocked: boolean;
  blockedReason?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

// Request interfaces for API calls
export interface BlockFullDateRequest {
  date: string;
  reason?: string;
}

export interface BlockTimeSlotsRequest {
  date: string;
  timeSlots: {
    startTime: string;
    endTime: string;
    reason?: string;
  }[];
}

export interface UnblockDateRequest {
  date: string;
}

export interface UnblockTimeSlotsRequest {
  date: string;
  timeSlots: {
    startTime: string;
    endTime: string;
  }[];
}

export interface BulkBlockDatesRequest {
  dates: string[];
  reason?: string;
}

export interface CreateDefaultTimeSlotsRequest {
  date: string;
  defaultSlots?: {
    startTime: string;
    endTime: string;
  }[];
}

export interface GetAvailableTimeSlotsRequest {
  date: string;
}

export interface GetBlockedDatesRequest {
  startDate: string;
  endDate: string;
}

export interface GetAllDeliverySlotsRequest {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  isBlocked?: boolean;
}

// Response interfaces
export interface DeliverySlotsResponse {
  success: boolean;
  message: string;
  data: DeliverySlot[];
}

export interface SingleDeliverySlotResponse {
  success: boolean;
  message: string;
  data: DeliverySlot;
}

export interface BlockedDatesResponse {
  success: boolean;
  message: string;
  data: {
    blockedDates: string[];
  };
}

export interface AvailableTimeSlotsResponse {
  success: boolean;
  message: string;
  data: {
    date: string;
    available: string[];
    blocked: string[];
  };
}
