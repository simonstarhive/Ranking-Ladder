// src/services/authService.ts
import API_BASE_URL from "./api";

export interface LoginResponse {
  success: boolean;
  name?: string;
  gender?: string;
  role?: string;
  rank?: number;
  error?: string;
}

export interface SignupResponse {
  success: boolean;
  error?: string;
  user?: {
    name: string;
    email: string;
    ucfid: string;
    gender: string;
  };
}

/* SIGNUP*/
export async function signup(
  name: string,
  email: string,
  password: string,
  ucfid: string,
  gender: string
): Promise<SignupResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        ucfid,
        gender
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || "Signup failed"
      };
    }

    
    return {
      success: true,
      user: {
        name: data.name,
        email: email,
        ucfid: ucfid,
        gender: data.gender
      }
    };

  } catch  {
    return {
      success: false,
      error: "Unable to connect to server"
    };
  }
}

/* LOGIN*/
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || "Invalid credentials"
      };
    }

    return data; 

  } catch  {
    return {
      success: false,
      error: "Unable to connect to server"
    };
  }
}

export default { signup, login };
