export interface UserSignupRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserResponse {
  id: string;
  email: string;
}
