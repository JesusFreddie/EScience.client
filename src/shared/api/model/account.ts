/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * EScience.Application
 * OpenAPI spec version: 1.0
 */
import type { Role } from "./role";
import type { User } from "./user";
import type { ArticleParticipant } from "./articleParticipant";

export interface Account {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  /** @nullable */
  name?: string | null;
  roleId?: number;
  role?: Role;
  userId?: string;
  user?: User;
  /** @nullable */
  articleParticipants?: ArticleParticipant[] | null;
}
