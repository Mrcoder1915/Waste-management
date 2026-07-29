import { useState, useRef } from "react";
import { authClient } from "../lib/auth-client";
import DashboardLayout from "../components/layouts/dashbord";
import { Container, ItemContainer } from "../components/catalyst/container";

type Session = typeof authClient.$Infer.Session.session;

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  // 1. Better Auth session
  const { data: sessionData } = authClient.useSession();
  const user = sessionData?.user;
  const currentSession = sessionData?.session;

  // Device sessions (Better Auth doesn't push these via the session hook,
  // so they're fetched separately with listSessions)
  const [sessions, setSessions] = useState<Session[]>([]);

  const [name, setName] = useState<string | undefined>(sessionData?.user.name);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploadingAvatar(true);
    try {
      const urlRes = await fetch("/api/uploads/avatar-url", { method: "POST" });
      if (!urlRes.ok) throw new Error("Could not get an upload URL");
      const { uploadURL } = await urlRes.json();

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(uploadURL, {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { result } = await uploadRes.json();
      const imageUrl = result.variants[0] as string;

      const { error } = await authClient.updateUser({ image: imageUrl });
      if (error) throw new Error(error.message);

      alert("Avatar updated successfully!");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to upload avatar");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // B. Update name
  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsSavingProfile(true);
    try {
      const { error } = await authClient.updateUser({ name });
      if (error) throw new Error(error.message);
      alert("Profile updated!");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to update profile",
      );
    } finally {
      setIsSavingProfile(false);
    }
  };

  // C. Update password
  const handleUpdatePassword = async () => {
    if (!user) return;
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: false,
      });
      if (error) throw new Error(error.message);

      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordError(
        error instanceof Error
          ? error.message
          : "Failed to update password. Did you sign up with Google?",
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // D. Revoke device
  const handleRevokeSession = async (token: string) => {
    const { error } = await authClient.revokeSession({ token });
    if (error) {
      alert(error.message || "Failed to sign out that device");
      return;
    }
    setSessions((prev) => prev.filter((s) => s.token !== token));
  };

  return (
    <DashboardLayout>
      <Container className="h-dvh flex items-center justify-center bg-gray-100 p-4">
        <ItemContainer className="w-full max-w-5xl h-[80%] bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-200">
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>
            <ul className="flex flex-col gap-2 font-medium text-sm">
              <li
                onClick={() => setActiveTab("profile")}
                className={`px-4 py-2 rounded-lg cursor-pointer ${activeTab === "profile" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-200"}`}
              >
                Profile
              </li>
              <li
                onClick={() => setActiveTab("security")}
                className={`px-4 py-2 rounded-lg cursor-pointer ${activeTab === "security" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-200"}`}
              >
                Security & Devices
              </li>
            </ul>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="flex-1 p-10 overflow-y-auto">
            {activeTab === "profile" && (
              <div className="max-w-2xl">
                <h3 className="text-2xl font-semibold mb-6 border-b pb-4">
                  Public Profile
                </h3>

                {/* Avatar Uploader */}
                <div className="flex items-center gap-6 mb-8">
                  <img
                    src={user?.image ?? undefined}
                    alt="Profile Avatar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      ref={fileInputRef}
                      onChange={handleAvatarUpload}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingAvatar}
                      className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 font-medium disabled:opacity-50"
                    >
                      {isUploadingAvatar ? "Uploading..." : "Manage Avatar"}
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      JPG, GIF or PNG. Max size of 10MB.
                    </p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email ?? ""}
                      disabled
                      className="p-2 border rounded-md bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-400">
                      Use the email change flow to update this — it needs OTP
                      verification on both the old and new address.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleUpdateProfile}
                  disabled={isSavingProfile}
                  className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium shadow-sm disabled:opacity-50"
                >
                  {isSavingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}

            {activeTab === "security" && (
              <div className="max-w-2xl">
                <h3 className="text-2xl font-semibold mb-6 border-b pb-4">
                  Security
                </h3>
                <div className="mb-10">
                  <h4 className="text-lg font-medium mb-4">Change Password</h4>
                  <div className="flex flex-col gap-4 max-w-md">
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {passwordError && (
                      <p className="text-red-500 text-sm font-medium">
                        {passwordError}
                      </p>
                    )}

                    <button
                      onClick={handleUpdatePassword}
                      disabled={
                        isUpdatingPassword || !currentPassword || !newPassword
                      }
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-medium w-fit mt-2 disabled:opacity-50"
                    >
                      {isUpdatingPassword ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">Active Devices</h4>
                  <div className="flex flex-col gap-3">
                    {sessions.map((s) => {
                      const isCurrentSession =
                        s.token === currentSession?.token;
                      const lastActive = s.updatedAt
                        ? new Date(s.updatedAt).toLocaleString()
                        : "Unknown time";
                      const createdOn = s.createdAt
                        ? new Date(s.createdAt).toLocaleDateString()
                        : "Unknown date";

                      return (
                        <div
                          key={s.id}
                          className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">
                              {isCurrentSession
                                ? "Current Device"
                                : "Other Device"}
                            </p>
                            <p className="text-sm text-gray-500">
                              Signed in: {createdOn}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Last active: {lastActive}
                            </p>
                          </div>

                          {isCurrentSession ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                              Active Now
                            </span>
                          ) : (
                            <button
                              onClick={() => handleRevokeSession(s.token)}
                              className="text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1 rounded text-sm font-medium transition-colors"
                            >
                              Sign Out
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ItemContainer>
      </Container>
    </DashboardLayout>
  );
};

export default Settings;
