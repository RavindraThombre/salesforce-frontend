"use client";

import { Users, UserCheck, ShieldCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Trainer {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface TrainerStatsProps {
  trainers: Trainer[];
}

export default function TrainerStats({ trainers }: TrainerStatsProps) {
  const totalTrainers = trainers.length;

  const totalRoles = new Set(trainers.map((trainer) => trainer.role)).size;

  const activeTrainers = trainers.length;

  const stats = [
    {
      title: "Total Trainers",
      value: totalTrainers,
      icon: Users,
    },
    {
      title: "Roles",
      value: totalRoles,
      icon: ShieldCheck,
    },
    {
      title: "Active Trainers",
      value: activeTrainers,
      icon: UserCheck,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
              </div>

              <div className="rounded-lg bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
