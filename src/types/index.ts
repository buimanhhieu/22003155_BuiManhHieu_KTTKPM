export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Tour {
  id: string;
  name: string;
  destination: string;
  price: number;
  duration: number;
  description: string;
  image?: string;
  startDate?: string;
  rating?: number;
  maxCapacity?: number;
}

export interface BookingRequest {
  userId: string;
  tourId: string;
}

export interface BookingResponse {
  status: string;
  bookingId?: string;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  status?: string;
  message?: string;
}

export interface CreateTourRequest {
  name: string;
  destination: string;
  price: number;
  duration: number;
  description: string;
  image?: string;
  startDate?: string;
  rating?: number;
  maxCapacity?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  userId?: string;
  token?: string;
  message: string;
}
