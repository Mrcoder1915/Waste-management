import { useState, useRef } from "react";
import { authClient } from "../lib/auth-client";
import DashboardLayout from "../components/layouts/dashbord";
import { Container, ItemContainer } from "../components/catalyst/container";
import { Input, Label } from "../components/catalyst/input";
import { Heading, Paragraph, Subheading } from "../components/catalyst/heading";
import { Button } from "../components/catalyst/button";

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
  const [previewImg, setPreviewImg] = useState<string | undefined>(undefined);

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
      setPreviewImg(URL.createObjectURL(file));
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
  const handleUpdateProfile = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  const handleUpdatePassword = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    console.log("name");
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
      <Container className="h-dvh justify-start lg:justify-center">
        <ItemContainer className="min-w-full  xl:min-w-4xl flex-col lg:flex-row shadow-none lg:shadow-2xl">
          <div className="lg:w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col  gap-5">
            <Heading color="primary">Settings</Heading>
            <ul className="flex lg:flex-col gap-2 font-medium text-sm">
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
              <div className="lg:max-w-2xl">
                <Heading color="primary">Public Profile</Heading>

                {/* Avatar Uploader */}
                <div className="flex items-center gap-6 my-8">
                  <img
                    src={user?.image ?? previewImg}
                    alt="Profile Avatar"
                    className="size-20 rounded-2xl object-cover border-2 border-gray-200"
                  />
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      hidden
                      ref={fileInputRef}
                      onChange={handleAvatarUpload}
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingAvatar}
                    >
                      {isUploadingAvatar ? "Uploading..." : "Manage Avatar"}
                    </Button>
                    <Paragraph className="text-xs">
                      JPG, GIF or PNG. Max size of 2MB.
                    </Paragraph>
                  </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleUpdateProfile}>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email ?? ""}
                    disabled
                  />
                  <Paragraph className="text-xs">
                    Use the email change flow to update this — it needs OTP
                    verification on both the old and new address.
                  </Paragraph>

                  <Button type="submit" disabled={isSavingProfile}>
                    {isSavingProfile ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </div>
            )}

            {activeTab === "security" && (
              <div className="lg:max-w-2xl">
                <Heading color="primary">Security & Devices</Heading>
                <div className="my-10">
                  <Subheading className="mb-2">Change Password</Subheading>
                  <form onSubmit={handleUpdatePassword}>
                    <Input
                      type="password"
                      required
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      required
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      required
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {passwordError && (
                      <p className="text-red-500 text-sm font-medium my-2">
                        {passwordError}
                      </p>
                    )}
                    <Button type="submit" disabled={isUpdatingPassword}>
                      {isUpdatingPassword ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </div>

                <div>
                  <Subheading>Active Devices</Subheading>
                  <div className="flex flex-col gap-3 mb-3">
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
                            <Button
                              variant="destructive"
                              onClick={() => handleRevokeSession(s.token)}
                            >
                              Sign Out
                            </Button>
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
