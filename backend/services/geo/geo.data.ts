import { LocationItem } from './geo.types';

/**
 * Baseline fallback registry has been migrated to PostgreSQL unified PageContent table.
 * All location data is strictly served from the database (db).
 */
export const LOCATIONS_REGISTRY: LocationItem[] = [];
