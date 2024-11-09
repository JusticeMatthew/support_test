import type { Seat } from "./seat";

export type Reservation = {
    flightId: number;
    seats: Seat[];
    passports: string[];
}