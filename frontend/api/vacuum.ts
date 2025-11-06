import apiFetch from ".";

export interface VacuumData {
  lastVacuum: Date | string;
  temp: number;
  vacuumCount: number;
  vacuumOn: boolean;
}

export function getVacuumData() {
  return apiFetch<VacuumData>("vacuum-data");
}

export function startVacuum() {
  return apiFetch("start-vacuum");
}

export function stopVacuum() {
  return apiFetch("stop-vacuum");
}
