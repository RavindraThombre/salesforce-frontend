"use client";

import { useEffect, useMemo, useState } from "react";
import { deleteTrainer, getAllTrainers } from "../lib/trainerService";

export interface Trainer {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function useTrainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const data = await getAllTrainers();
      setTrainers(data);
    } catch (error) {
      console.error("Failed to fetch trainers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDeleteTrainer = async (id: string) => {
    try {
      await deleteTrainer(id);
      await fetchTrainers();
    } catch (error) {
      console.error("Failed to delete trainer", error);
    }
  };

  const filteredTrainers = useMemo(() => {
    if (!search.trim()) return trainers;

    const keyword = search.toLowerCase();

    return trainers.filter(
      (trainer) =>
        trainer.name.toLowerCase().includes(keyword) ||
        trainer.email.toLowerCase().includes(keyword) ||
        trainer.role.toLowerCase().includes(keyword),
    );
  }, [trainers, search]);

  return {
    trainers,
    filteredTrainers,
    loading,
    search,
    setSearch,
    fetchTrainers,
    deleteTrainer: handleDeleteTrainer,
  };
}
