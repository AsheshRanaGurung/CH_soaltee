import React from "react";

export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface IDrawer {
  title: string;
  children: React.ReactNode;
}
