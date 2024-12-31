"use client";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import TeamStatsRender from "../../../../components/TeamStats";
import { JustScoutRoutes } from "../../../../types/Routes";
import TeamDetails from "../../../../components/TeamDetails";
import Loader from "../../../../components/Loader";

export default function Teams() {
  const router = useRouter();
  const params = useParams();
  const id = params.id ? parseInt(params.id as string) : 0;
  const year = params.year ? parseInt(params.year as string) : 0;
  const [isPending, startTransition] = useTransition();
  const [years, setYears] = useState<number[]>();

  useEffect(() => {
    startTransition(async () => {
      await fetch(`/api/team/${id}/years-participated`)
        .then(async (res) => setYears((await res.json()) as number[]))
        .catch((err) => console.error("Failed to fetch team data", err));
    });
  }, [id]);

  return isPending ? (
    <Loader />
  ) : (
    <Box justifyContent="center">
      <Card>
        <CardContent>
          <Grid container spacing={{ xs: 4, md: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TeamDetails teamNumber={id} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  Stats
                </Typography>
              </Box>

              <Box mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="year-select-label">Year</InputLabel>
                  <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={year}
                    label="year"
                    onChange={(e) =>
                      router.push(
                        JustScoutRoutes.profiles.subpaths.team.path +
                          `/${id}/${e.target.value}`
                      )
                    }
                  >
                    {years
                      ?.sort((a, b) => b - a)
                      .map((yearNum) => (
                        <MenuItem key={yearNum} value={yearNum}>
                          {yearNum}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>

              <Box mt={2} width="auto">
                <TeamStatsRender id={id} year={year} />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
