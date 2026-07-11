export type Row = {
  id: string; auditor: string; bank: string; sector: string;
  category: string; reg: string; invested: string; investedTs: number; winnings: number; size: string;
};

const AUD = ["ClearView Compliance", "EverGreen Audit Partners", "BlueSky Financial Reviews", "Integrity Audit Solutions", "GoldLeaf Risk Advisors", "SummitPoint Assurance", "TrueNorth Audit", "Meridian Controls", "Anchor Assurance", "Northgate Audit Co", "Vanta Review Group", "Harbor Audit Group"];
const BANKS = ["Valley National", "Sunrise", "SilverWave", "RiverStone Com", "Pinnacle Trust B.", "Maple Ridge", "Horizon Bank"];
const SECTORS = ["Finance", "Transportation", "Healthcare", "Pharmaceuticals", "Hospitality", "Agriculture"];
const CATS = ["Certificate", "Financial Statements", "Legal Documents", "Training Manuals", "Tax Filings", "Project Plans", "HR Records"];
const DATES: [string, number][] = [["29 Jun 2022", 1656460800], ["15 Mar 2024", 1710460800], ["19 Oct 2022", 1666137600], ["03 Mar 2020", 1583193600], ["22 Aug 2023", 1692662400], ["11 Jan 2023", 1673395200], ["07 Sep 2021", 1631232000], ["18 Feb 2024", 1708214400]];
const SIZES = ["12.3 MB", "40 MB", "192 KB", "120 KB", "8 MB", "540 KB", "2.1 MB", "76 KB", "290 KB", "12 MB"];
const WINS = [762432, 737392, 120500, 39490, 40200, 42300, 2300, 512500, 210000, 880000, 54000, 76000];

export const DEMO_ROWS: Row[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  auditor: AUD[i % AUD.length],
  bank: BANKS[i % BANKS.length],
  sector: SECTORS[i % SECTORS.length],
  category: i % 6 === 2 ? "Policies" : CATS[i % CATS.length],
  reg: `REG-${(10234 + i * 373).toString()}`,
  invested: DATES[i % DATES.length][0],
  investedTs: DATES[i % DATES.length][1],
  winnings: WINS[i % WINS.length] + i * 1370,
  size: SIZES[i % SIZES.length],
}));
