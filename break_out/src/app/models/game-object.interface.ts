export interface GameObject {
    id: string;
    type: 'puzzle' | 'obstacle' | 'collectible' | 'door';
    interactable: boolean;
    avatarUrl?: string;
  }
  