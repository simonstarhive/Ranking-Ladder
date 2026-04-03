
import API_BASE_URL from "./api";

export type UserFromAPI = {
  id: number;
  ucfid: number;
  name: string;
  email: string;
  gender: string;
};

export const userService = {
  getAllUsers: async (): Promise<UserFromAPI[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  },

  updateUser: async (id: number, user: UserFromAPI): Promise<UserFromAPI> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error("Failed to update user");
    return response.json();
  },

  deleteUser: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete user");
  },
};

export default userService;