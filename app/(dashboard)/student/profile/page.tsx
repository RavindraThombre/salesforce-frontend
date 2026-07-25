"use client";

import ChangePasswordCard from "./components/ChangePasswordCard";
import ProfileAvatarCard from "./components/ProfileAvatarCard";
import ProfileCard from "./components/ProfileCard";
import ProfileHeader from "./components/ProfileHeader";
import ProfileSkeleton from "./components/ProfileSkeleton";
import useProfile from "./hooks/useProfile";

export default function StudentProfilePage() {
  const profile = useProfile();

  if (profile.loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="space-y-6">
      <ProfileHeader />

      <div className="grid gap-6 lg:grid-cols-3">
        <ProfileAvatarCard profile={profile.profile} />

        <ProfileCard
          profile={profile.profile}
          saving={profile.saving}
          onChange={profile.handleProfileChange}
          onSave={profile.saveProfile}
        />
      </div>

      <ChangePasswordCard
        passwords={profile.passwords}
        changing={profile.changingPassword}
        onChange={profile.handlePasswordChange}
        onSave={profile.updateUserPassword}
      />
    </div>
  );
}
