export type UserRole = "homeowner" | "professional";

/** Firestore message — Egyptian Arabic text; optional voice */
export type MessageType = "text" | "audio" | "mixed";

export interface ChatMessageDoc {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_role: UserRole;
  message_type: MessageType;
  /** Egyptian Arabic (or mixed) — nullable if audio-only */
  text_content: string | null;
  /** Firebase Storage URL for voice note */
  audio_url: string | null;
  /** Locale hint for TTS / search */
  locale: "ar-EG";
  created_at: string;
  read_at?: string | null;
}

export interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface Profile {
  userId: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  skills: string[];
  yearsOfExperience?: number;
  hourlyRate?: number;
  isVerified: boolean;
  verificationStatus: "pending" | "approved" | "rejected";
  ratingAvg: number;
  ratingCount: number;
}

export interface Job {
  id: string;
  homeownerId: string;
  category: "Plumbing" | "Electrical" | "Carpentry";
  title: string;
  description: string;
  preferredTime?: string;
  status: "open" | "quoted" | "booked" | "completed" | "cancelled";
}

export interface Booking {
  id: string;
  jobId: string;
  homeownerId: string;
  proId: string;
  scheduledStart: string;
  scheduledEnd: string;
  quotedPrice: number;
  bookingStatus: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
}

export interface Review {
  id: string;
  bookingId: string;
  homeownerId: string;
  proId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
