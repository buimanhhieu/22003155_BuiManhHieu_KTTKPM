import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { LoginRequest, LoginResponse, BookingRequest, BookingResponse, Tour, CreateTourRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const extractTours = (payload: unknown): Tour[] => {
  if (Array.isArray(payload)) {
    return payload as Tour[];
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;

    if (Array.isArray(record.data)) {
      return record.data as Tour[];
    }

    if (Array.isArray(record.tours)) {
      return record.tours as Tour[];
    }
  }

  return [];
};

class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Load token from localStorage if available
    this.token = localStorage.getItem('token');
  }

  /**
   * Login to the system
   * Calls Orchestrator POST /login
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.api.post<LoginResponse>('/login', credentials);
      if (response.data.token) {
        this.token = response.data.token;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId || '');
      } else if (response.data.userId) {
        this.token = response.data.userId;
        localStorage.setItem('token', response.data.userId);
        localStorage.setItem('userId', response.data.userId);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  }

  /**
   * Logout from the system
   */
  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  /**
   * Get all tours
   * Calls Orchestrator GET /tours
   */
  async getTours(): Promise<Tour[]> {
    try {
      const response = await this.api.get('/tours');
      const tours = extractTours(response.data);

      if (tours.length > 0) {
        return tours;
      }

      throw new Error('No tours were returned from the orchestrator');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch tours');
      }
      throw error;
    }
  }

  /**
   * Get tour by ID
   */
  async getTourById(tourId: string): Promise<Tour> {
    const tours = await this.getTours();
    const tour = tours.find((item) => item.id === tourId);

    if (!tour) {
      throw new Error('Tour not found');
    }

    return tour;
  }

  /**
   * Book a tour
   * Calls Orchestrator POST /book-tour
   * Input: { userId: string, tourId: string }
   */
  async bookTour(booking: BookingRequest): Promise<BookingResponse> {
    try {
      const response = await this.api.post<BookingResponse>('/book-tour', booking);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Booking failed';
        return {
          status: 'fail',
          message: errorMessage,
        };
      }
      return {
        status: 'fail',
        message: 'An unexpected error occurred',
      };
    }
  }

  /**
   * Create a new tour
   * Calls Orchestrator POST /tours
   */
  async createTour(tour: CreateTourRequest): Promise<Tour> {
    const response = await this.api.post<Tour>('/tours', tour);
    return response.data;
  }

  /**
   * Get current user info
   */
  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new ApiService();
