"use client";

import { Award, Download, FileBadge, ShieldCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  certificates: string[];
};

export default function StudentCertificatesCard({ certificates }: Props) {
  return (
    <Card className="overflow-hidden rounded-3xl border shadow-sm transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-primary/5 to-transparent px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3">
            <Award className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Certificates</h2>

            <p className="text-sm text-muted-foreground">
              Certificates earned by this student
            </p>
          </div>
        </div>

        <Badge variant="secondary">
          {certificates.length} Certificate
          {certificates.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <CardContent className="p-6">
        {certificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Award className="mb-4 h-14 w-14 text-muted-foreground/40" />

            <h3 className="text-lg font-semibold">No Certificates Yet</h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {"The student hasn't earned any certificates yet."}
            </p>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="mb-6 rounded-2xl border bg-primary/5 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-10 w-10 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Certificates
                  </p>

                  <h3 className="text-3xl font-bold text-primary">
                    {certificates.length}
                  </h3>
                </div>
              </div>
            </div>

            {/* Certificate List */}
            <div className="space-y-4">
              {certificates.map((certificate, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4 transition hover:bg-muted/40"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-primary/10 p-3">
                      <FileBadge className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">{certificate}</h3>

                      <p className="text-sm text-muted-foreground">
                        Successfully Completed
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
