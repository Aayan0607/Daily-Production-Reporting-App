export interface DowntimeReason {
  id: number;
  code: string;
  description: string;
}

export const initialDowntimeReasons: DowntimeReason[] = [
  {
    id: 1,
    code: "D01",
    description: "Paper Jam",
  },
  {
    id: 2,
    code: "D02",
    description: "Ink Not Available",
  },
  {
    id: 3,
    code: "D03",
    description: "Machine Cleaning",
  },
  {
    id: 4,
    code: "D04",
    description: "Power Failure",
  },
  {
    id: 5,
    code: "D05",
    description: "Material Not Available",
  },
];