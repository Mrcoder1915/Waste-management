import { useState, useRef, useEffect } from "react";
import { useUser, useSessionList, useSession } from "@clerk/react";
import DashboardLayout from "../components/layouts/dashbord";
import { Container, ItemContainer } from "../components/catalyst/container";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // 1. Clerk Hooks
  const { user, isLoaded: isUserLoaded } = useUser();
  const { session: currentSession } = useSession();
  const { sessions, isLoaded: isSessionsLoaded } = useSessionList();

  // 2. Profile State & Refs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // For the hidden file upload

  // 3. Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  // Sync profile data on load
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  // A. Upload New Avatar
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      // Clerk handles the CDN upload automatically!
      await user.setProfileImage({ file });
      alert("Avatar updated successfully!");
    } catch (error: any) {
      alert(error.errors?.[0]?.message || "Failed to upload avatar");
    }
  };

  // B. Update Name
  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsSavingProfile(true);
    try {
      await user.update({ firstName, lastName });
      alert("Profile updated!");
    } catch (error: any) {
      alert(error.errors?.[0]?.message || "Failed to update profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // C. Update Password
  const handleUpdatePassword = async () => {
    if (!user) return;
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await user.updatePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      alert("Password updated successfully!");
      // Clear the form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setPasswordError(
        error.errors?.[0]?.longMessage ||
          "Failed to update password. Did you sign up with Google?",
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // D. Revoke Device
  const handleRevokeSession = async (sessionId: string) => {
    const sessionToRevoke = sessions?.find((s) => s.id === sessionId);
    if (sessionToRevoke) {
      await sessionToRevoke.end();
    }
  };

  // Loading State
  if (!isUserLoaded || !isSessionsLoaded) return null;

  return (
    <DashboardLayout>
      <Container className="h-dvh flex items-center justify-center bg-gray-100 p-4">
        <ItemContainer className="w-full max-w-5xl h-[80%] bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-200">
          {/* LEFT SIDEBAR */}
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
            {/* =========================================
                PROFILE TAB
            ========================================= */}
            {activeTab === "profile" && (
              <div className="max-w-2xl">
                <h3 className="text-2xl font-semibold mb-6 border-b pb-4">
                  Public Profile
                </h3>

                {/* Avatar Uploader */}
                <div className="flex items-center gap-6 mb-8">
                  <img
                    src={user?.imageUrl}
                    alt="Profile Avatar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    {/* Hidden file input triggered by the button */}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      ref={fileInputRef}
                      onChange={handleAvatarUpload}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 font-medium"
                    >
                      Manage Avatar
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      JPG, GIF or PNG. Max size of 10MB.
                    </p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.primaryEmailAddress?.emailAddress || ""}
                      disabled
                      className="p-2 border rounded-md bg-gray-50 text-gray-500"
                    />
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

            {/* =========================================
                SECURITY TAB
            ========================================= */}
            {activeTab === "security" && (
              <div className="max-w-2xl">
                <h3 className="text-2xl font-semibold mb-6 border-b pb-4">
                  Security
                </h3>

                {/* Change Password UI */}
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

                    {/* Error Message Display */}
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

                {/* Device History */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Active Devices</h4>
                  <div className="flex flex-col gap-3">
                    {sessions?.map((session) => {
                      const isCurrentSession =
                        session.id === currentSession?.id;

                      // Clerk's modern Session object uses native JavaScript Date objects
                      const lastActive = session.lastActiveAt
                        ? session.lastActiveAt.toLocaleString()
                        : "Unknown time";

                      const createdOn = session.createdAt
                        ? session.createdAt.toLocaleDateString()
                        : "Unknown date";

                      return (
                        <div
                          key={session.id}
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
                              onClick={() => handleRevokeSession(session.id)}
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
