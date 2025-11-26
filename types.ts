import React from 'react';

export interface Hairstyle {
  id: string;
  title: string;
  description?: string;
  date: string;
  imageUrl: string;
  tags: string[];
  isFavorite: boolean;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}