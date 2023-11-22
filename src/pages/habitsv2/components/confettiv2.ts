import confetti from "canvas-confetti";

export function myConfetti(x: number, y: number): void {
	confetti({
		particleCount: 20,
		startVelocity: 15,
		spread: 360,
		ticks: 75,
		origin: { x: x / window.innerWidth, y: y / window.innerHeight }
	});
}
