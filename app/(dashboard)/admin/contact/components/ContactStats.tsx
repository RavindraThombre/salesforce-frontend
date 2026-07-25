import { Card, CardContent } from "@/components/ui/card";
import { Mail, Clock3, CircleCheckBig } from "lucide-react";

import { Contact, ContactStatus } from "../lib/contact.type";

interface ContactStatsProps {
  contacts: Contact[];
}

export default function ContactStats({ contacts }: ContactStatsProps) {
  const total = contacts.length;

  const pending = contacts.filter(
    (contact) => contact.status === ContactStatus.NEW,
  ).length;

  const replied = contacts.filter(
    (contact) => contact.status === ContactStatus.REPLIED,
  ).length;

  const stats = [
    {
      title: "Total Messages",
      value: total,
      icon: Mail,
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
    },
    {
      title: "Replied",
      value: replied,
      icon: CircleCheckBig,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>

                <h3 className="mt-1 text-3xl font-bold">{stat.value}</h3>
              </div>

              <div className="rounded-lg border p-3">
                <Icon className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
