"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/app/lib/axiosConfig";

type Trainer = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function AdminTrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/trainers"); // ✅ API
      setTrainers(res.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const deleteTrainer = async (id: string) => {
    try {
      await apiClient.delete(`/trainers/${id}`);
      fetchTrainers();
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  return (
    <div className="p-2 space-y-2">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trainers</h1>

        <Link href="/admin/trainers/create">
          <Button>Create Trainer</Button>
        </Link>
      </div>

      {/* LOADING */}
      {loading ? (
        <p>Loading...</p>
      ) : trainers.length === 0 ? (
        
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium">No trainers found</p>
          <p className="text-sm text-muted-foreground mb-4">
            Start by creating your first trainer
          </p>

          <Link href="/admin/trainers/create">
            <Button>Create Trainer</Button>
          </Link>
        </div>

      ) : (

        /* LIST */
        <div className="grid md:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <Card key={trainer._id} className="hover:shadow-lg transition">
              <CardContent className="p-4 space-y-2">

                {/* NAME */}
                <h2 className="font-semibold text-lg">
                  {trainer.name}
                </h2>

                {/* EMAIL */}
                <p className="text-sm text-muted-foreground">
                  {trainer.email}
                </p>

                {/* ROLE */}
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {trainer.role}
                </span>

                {/* ACTIONS */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteTrainer(trainer._id)}
                  >
                    Delete
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}