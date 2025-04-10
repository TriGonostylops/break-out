export interface GameObject {
    id: string;
    type: 'puzzle' | 'obstacle' | 'collectible';
    interactable: boolean;
    // Optionally add properties like image, description, or effects
  }
  