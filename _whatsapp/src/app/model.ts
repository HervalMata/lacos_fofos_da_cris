import { Observable } from "rxjs";

export interface ChatGroup {
  readonly id?: number;
  readonly name: string;
  readonly photo_url: string;
  is_member?: Observable<boolean>;
  last_message?: Observable<ChatMessage>;
  viewed: boolean;
  readonly created_at?: { date: string };
  readonly updated_at?: { date: string };
}

export enum Role {
  SELLER = 1,
  CUSTOMER = 2
}

export interface ChatMessage {
  type: string;
  content: string;
  user_id: string;
  user$?: Observable<{ name: string, photo_url: string }>;
  user?: User;
  created_at: number;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  profile?: UserProfile;
  role: Role;
  readonly created_at?: { date: string };
  readonly updated_at?: { date: string };
}

export interface UserProfile {
  has_photo: boolean;
  photo_url: string;
  phone_number: string;
  firebase_uid: string;
}
