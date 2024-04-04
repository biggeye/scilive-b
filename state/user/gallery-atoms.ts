//state/gallery-atoms.ts

import { atom } from "recoil";
import { GalleryItem } from '@/types';

export const contentItemsState = atom<GalleryItem[]>({
  key: 'contentItemsState',
  default: [],
});

export const currentIndexState = atom<number | null>({
  key: 'currentIndexState',
  default: 0,
});

export const currentGroupState = atom<number | null>({
  key: 'currentGroupState',
  default: 0,
});