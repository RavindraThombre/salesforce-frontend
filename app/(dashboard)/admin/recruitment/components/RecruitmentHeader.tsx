"use client";

import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface RecruitmentHeaderProps {
  onCreate: () => void;
}

export default function RecruitmentHeader({
  onCreate,
}: RecruitmentHeaderProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "stretch", sm: "center" }}
      spacing={2}
      mb={3}
    >
      <div>
        <Typography variant="h5" fontWeight={700}>
          Job Positions
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Manage job openings, publish careers, and accept applications.
        </Typography>
      </div>

      <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
        Create Position
      </Button>
    </Stack>
  );
}
