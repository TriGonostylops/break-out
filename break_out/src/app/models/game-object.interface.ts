export interface GameObject {
  id: string;
  type: 'puzzle' | 'obstacle' | 'collectible' | 'door' | 'note';
  interactable: boolean;
  avatarUrl?: string;
}
