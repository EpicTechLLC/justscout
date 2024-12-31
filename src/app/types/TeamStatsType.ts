type EpaStats = {
  mean: number;
  sd: number;
};

type Rank = {
  rank: number;
  percentile: number;
  team_count: number;
};

type Ranks = {
  total: Rank;
  country: Rank;
  state: Rank;
  district: Rank;
};

type StatsRecord = {
  wins: number;
  losses: number;
  ties: number;
  count: number;
  winrate: number;
};

type Competing = {
  this_week: boolean;
  next_event_key: string | null;
  next_event_name: string | null;
  next_event_week: number | null;
};
type Stat = {
  mean: number;
  sd: number;
};

type EpaBreakdown = {
  auto_points: EpaStats;
  teleop_points: EpaStats;
  endgame_points: EpaStats;
};

type TeamStatsType = {
  team: string;
  year: number;
  name: string;
  country: string;
  state: string;
  district: string | null;
  offseason: boolean;
  epa: {
    total_points: EpaStats;
    unitless: number;
    norm: number;
    conf: [number, number];
    breakdown: EpaBreakdown;
    stats: {
      start: number;
      pre_champs: number;
      max: number;
    };
    ranks: Ranks;
  };
  record: {
    season: StatsRecord;
    full: StatsRecord;
  };
  district_points: number | null;
  district_rank: number | null;
  competing: Competing;
};
