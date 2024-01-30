import { writable } from "svelte/store";

export const suggestions = writable([]);

export const vote = writable([]);

export const stats = writable([]);

export const sum = writable();