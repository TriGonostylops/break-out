export interface Player {
  id: string;
  username: string;
  position: {
    x: number;
    y: number;
  };
  score: number;
  avatarUrl?: string;
}
