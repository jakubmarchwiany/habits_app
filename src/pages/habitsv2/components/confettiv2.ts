import confetti from "canvas-confetti";

export function myConfetti(x: number, y: number): void {
	confetti({
		origin: { x: x / window.innerWidth, y: y / window.innerHeight },
		particleCount: 20,
		spread: 360,
		startVelocity: 15,
		ticks: 75
	});
}
