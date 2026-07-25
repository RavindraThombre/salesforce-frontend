import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrainerHeaderProps {
  onCreate: () => void;
}

export default function TrainerHeader({ onCreate }: TrainerHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trainers</h1>

        <p className="text-muted-foreground">
          Manage trainers and instructors for your academy.
        </p>
      </div>

      <Button onClick={onCreate}>
        <Plus className="mr-2 h-4 w-4" />
        Create Trainer
      </Button>
    </div>
  );
}
