"use client";

import { useState } from "react";
import AddEditTrainerDialog from "./components/AddEditTrainerDialog";
import TrainerHeader from "./components/TrainerHeader";
import TrainersTable from "./components/TrainersTable";
import TrainerStats from "./components/TrainerStats";
import useTrainers, { Trainer } from "./hooks/useTrainers";

export default function AdminTrainersPage() {
  const trainer = useTrainers();
  const [open, setOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const handleEdit = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setOpen(true);
  };
  const handleCreate = () => {
    setSelectedTrainer(null);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <TrainerHeader onCreate={handleCreate} />
      <TrainerStats trainers={trainer.trainers} />
      <TrainersTable
        trainers={trainer.filteredTrainers}
        loading={trainer.loading}
        search={trainer.search}
        onSearchChange={trainer.setSearch}
        onDelete={trainer.deleteTrainer}
        onEdit={handleEdit}
      />

      <AddEditTrainerDialog
        open={open}
        onOpenChange={setOpen}
        trainer={selectedTrainer}
        onSuccess={trainer.fetchTrainers}
      />
    </div>
  );
}
