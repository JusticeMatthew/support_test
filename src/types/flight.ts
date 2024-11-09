import type { Seat } from "./seat";

export type Flight = {
    id: number;
    from: string;
    to: string;
    seats: Seat[];
}