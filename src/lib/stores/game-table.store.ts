import { writable } from 'svelte/store';

export const gameTable = writable<boolean[][]>([]);
export const gameTableSize = writable({ row: 10, col: 10 });
