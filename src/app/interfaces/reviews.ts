// review.ts

export interface Review {
    id: number;
    product_id: number;
    userId: number;
    username: string;
    photo_url: string; // URL de la foto de perfil del usuario
    rate: number;
    comment: string;
    created_at: Date;
  }
  