import { useState } from "react";
import type { User, NewUser } from "../../pages/AdminAddUser";

type UserModalProps = {
  user?: User;
  onClose: () => void;
  onSave: (user: User | NewUser) => void;
  onDelete?: (id: number) => void;
};

export default function UserModal({ user, onClose, onSave, onDelete }: UserModalProps) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [ucfid, setUcfid] = useState(user?.ucfid.toString() || "");
  const [gender, setGender] = useState(user?.gender || "MALE"); // default to Male

  const handleSave = () => {
    if (!name || !email || !ucfid || !gender) {
      alert("Please fill out all fields");
      return;
    }

    const newData = { name, email, ucfid: parseInt(ucfid), gender };

    if (user) {
      onSave({ ...user, ...newData });
    } else {
      onSave(newData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[360px] flex flex-col gap-3">
        <h2 className="text-xl font-bold text-center">
          {user ? "Edit User" : "Add User"}
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 rounded"
        />

        <input
          value={ucfid}
          onChange={(e) => setUcfid(e.target.value)}
          placeholder="UCFID"
          className="border p-2 rounded"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded"
        />

        {/* Gender Radio Buttons */}
        <div className="flex gap-4 items-center mt-1">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="MALE"
              checked={gender === "MALE"}
              onChange={(e) => setGender(e.target.value)}
            />
            MALE
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="FEMALE"
              checked={gender === "FEMALE"}
              onChange={(e) => setGender(e.target.value)}
            />
            FEMALE
          </label>

          
        </div>

        <button onClick={handleSave} className="bg-blue-500 text-white py-2 rounded mt-3">
          Save
        </button>

        {user && onDelete && (
          <button
            onClick={() => onDelete(user.id)}
            className="bg-red-500 text-white py-2 rounded"
          >
            Delete
          </button>
        )}

        <button onClick={onClose} className="text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
}