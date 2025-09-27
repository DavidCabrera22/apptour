const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface CartItem {
  id: string;
  packageId: string;
  packageName: string;
  packageImage: string;
  quantity: number;
  price: number;
  selectedDate: string;
  pickupLocation: string;
}

export interface CreateCartItemDto {
  packageId: string;
  quantity: number;
  selectedDate: string;
  pickupLocation: string;
}

export interface BookingDto {
  packageId: string;
  selectedDate: string;
  pickupLocation: string;
  totalAmount: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface PaymentData {
  amount: number;
  currency: string;
  paymentMethod: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  bookingId?: string;
}

export interface TourPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  images: string[];
  features: string[];
  included: string[];
  notIncluded: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
  }>;
  availability: boolean;
  maxCapacity: number;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'extreme';
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  packageId: string;
  userId: string;
  selectedDate: string;
  pickupLocation: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PaymentResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Agregar token de autenticación si existe
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Cart API methods
  async getCartItems(): Promise<CartItem[]> {
    return this.request<CartItem[]>('/cart');
  }

  async addToCart(item: CreateCartItemDto): Promise<CartItem> {
    return this.request<CartItem>('/cart', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
    return this.request<CartItem>(`/cart/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId: string): Promise<void> {
    return this.request<void>(`/cart/${itemId}`, {
      method: 'DELETE',
    });
  }

  async clearCart(): Promise<void> {
    return this.request<void>('/cart', {
      method: 'DELETE',
    });
  }

  // Bookings API methods
  async createBooking(booking: BookingDto): Promise<Booking> {
    return this.request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    });
  }

  async getBookings(): Promise<Booking[]> {
    return this.request<Booking[]>('/bookings');
  }

  async getBooking(id: string): Promise<Booking> {
    return this.request<Booking>(`/bookings/${id}`);
  }

  // Payments API methods
  async processPayment(paymentData: PaymentData): Promise<PaymentResponse> {
    return this.request<PaymentResponse>('/payments/process', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Tour packages API methods
  async getTourPackages(): Promise<TourPackage[]> {
    return this.request<TourPackage[]>('/tour-packages');
  }

  async getTourPackage(id: string): Promise<TourPackage> {
    return this.request<TourPackage>(`/tour-packages/${id}`);
  }

  // Auth API methods
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<void> {
    return this.request<void>('/auth/logout', {
      method: 'POST',
    });
  }

  async getProfile(): Promise<User> {
    return this.request<User>('/auth/profile');
  }
}

export const apiService = new ApiService();
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  bookings: Booking[];
  createdAt: string;
  updatedAt: string;
}