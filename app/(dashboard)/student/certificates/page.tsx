"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Certificate, getCertificates } from "./lib/certificate";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getCertificates();
        setCertificates(data);
      } catch (err) {
        console.error("Error fetching certificates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Certificates</h2>

      {certificates.length === 0 ? (
        <p className="text-muted-foreground">
          No certificates available
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card key={cert._id}>
              <CardContent className="p-4 space-y-3">

                {/* COURSE */}
                <h3 className="text-lg font-semibold">
                  {cert.course}
                </h3>

                {/* STUDENT */}
                <p className="text-sm text-muted-foreground">
                  Student: {cert.student}
                </p>

                {/* DATE */}
                <p className="text-sm">
                  🎓 Completed on:{" "}
                  {new Date(cert.date).toDateString()}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCert(cert)}
                  >
                    View
                  </Button>

                  <Button
                    onClick={() =>
                      window.open(cert.certificateUrl, "_blank")
                    }
                  >
                    Download
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}


          {selectedCert && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    
    <div className="bg-white dark:bg-gray-900 rounded-lg w-[90%] max-w-3xl p-4 relative">

      {/* CLOSE BUTTON */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        onClick={() => setSelectedCert(null)}
      >
        ✕
      </button>

      {/* TITLE */}
      <h3 className="text-lg font-semibold mb-3">
        {selectedCert.course}
      </h3>

      {/* PDF PREVIEW */}
      <div className="w-full h-[500px] border rounded overflow-hidden">
        <iframe
          src={selectedCert.certificateUrl}
          className="w-full h-full"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => setSelectedCert(null)}
        >
          Close
        </Button>

        <Button
          onClick={() =>
            window.open(selectedCert.certificateUrl, "_blank")
          }
        >
          Download
        </Button>
      </div>

    </div>
  </div>
)}
        </div>
      )}
    </div>
  );
}