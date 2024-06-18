import { z } from "zod";

export function getImagePath(file: string): string;
export function getImagePath(file?: null): undefined;
export function getImagePath(file?: string | null) {
  if (!file) return;

  return `/api/uploads/${file}`;
}
