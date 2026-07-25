"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Profile } from "../lib/profile.type";

interface ProfileAvatarCardProps {
  profile: Profile;
}

export default function ProfileAvatarCard({ profile }: ProfileAvatarCardProps) {
  const initials =
    profile.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <Card className="h-fit">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
        <Avatar className="h-28 w-28">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback className="text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{profile.name || "Student"}</h2>

          <Badge variant="secondary">{profile.role || "Student"}</Badge>

          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
