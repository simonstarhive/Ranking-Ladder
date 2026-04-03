import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/ui/PageTitle";
import Layout from "../components/ui/Layout";
import AdminButton from "../components/ui/AdminButton";
import UserModal from "../components/layout/UserModal";
import userService from "../services/userService"; 


export type User = {
  id: number;
  ucfid: number;
  name: string;
  email: string;
  gender: string;
};

export type NewUser = Omit<User, "id">; 

export default function AdminAddUser() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await userService.getAllUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError("Could not connect to the server to load users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

 
  // edit
  const handleSaveUser = async (updated: User) => {
  try {
    const savedUser = await userService.updateUser(updated.id, updated);

    setUsers((prev) =>
      prev.map((u) => (u.id === savedUser.id ? savedUser : u))
    );

    setShowEdit(false);
    setSelectedUser(null);
  } catch {
    alert("Error updating user information");
  }
};

  //DELETE 
  const handleDeleteUser = async (id: number) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await userService.deleteUser(id);

    setUsers((prev) => prev.filter((u) => u.id !== id));

    setShowEdit(false);
    setSelectedUser(null);
  } catch {
    alert("Error deleting user from server");
  }
};

  return (
    <Layout>
      {/* HEADER */}
      <div className="relative mb-4 flex items-center justify-center">
        <button
          onClick={() => navigate("/AdminWelcome")}
          className="shrink-0 px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
        >
          ←
        </button>

        <div className="flex-1 text-center">
          <PageTitle title="Users" />
        </div>

        <div className="flex shrink-0 gap-2">
          <AdminButton
            onClick={() => {
              if (!selectedUser) {
                alert("Please select a user first");
                return;
              }
              setShowEdit(true);
            }}
          >
            Edit
          </AdminButton>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-2xl shadow-lg p-5 overflow-x-auto">
        {loading ? (
          <p className="text-center py-6 font-semibold text-gray-500">Loading users...</p>
        ) : error ? (
          <p className="text-center py-6 text-red-500 font-medium">{error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="p-3 rounded-l-xl">UCFID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`border-b cursor-pointer transition ${
                    selectedUser?.id === user.id ? "bg-blue-100" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="p-3 font-semibold">{user.ucfid}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      

      {/* EDIT MODAL */}
      {showEdit && selectedUser && (
        <UserModal
          key={selectedUser.ucfid}
          user={selectedUser}
          onClose={() => setShowEdit(false)}
          onSave={(data) => handleSaveUser(data as User)}
          onDelete={() => handleDeleteUser(selectedUser.id)}
        />
      )}
    </Layout>
  );
}