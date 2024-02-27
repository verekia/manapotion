export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t
export const clamp = (value: number, limit: number) => Math.max(Math.min(value, limit), -limit)
export const pi = Math.PI
