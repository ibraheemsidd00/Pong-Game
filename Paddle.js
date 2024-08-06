const SPEED = 100;
const PADDLE_MIN_POSITION = 0; // Lower bound for paddle position
const PADDLE_MAX_POSITION = 100; // Upper bound for paddle position

export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }

    set position(value) {
        // Constrain the position to be within the defined bounds
        const constrainedValue = Math.max(PADDLE_MIN_POSITION, Math.min(PADDLE_MAX_POSITION, value));
        this.paddleElem.style.setProperty("--position", constrainedValue);
    }

    rect() {
        return this.paddleElem.getBoundingClientRect();
    }

    reset() {
        // Reset paddle to the middle position
        this.position = (PADDLE_MAX_POSITION - PADDLE_MIN_POSITION) / 2;
    }

    update(delta, ballHeight) {
        // Ensure delta is in seconds if needed
        const deltaInSeconds = delta / 1000;

        // Update paddle position smoothly
        const currentPosition = this.position;
        const targetPosition = ballHeight;

        // Calculate new position based on the target position
        const movement = SPEED * deltaInSeconds * (targetPosition - currentPosition);
        this.position = currentPosition + movement;

        // Constrain the paddle position within bounds
        if (this.position < PADDLE_MIN_POSITION) {
            this.position = PADDLE_MIN_POSITION;
        } else if (this.position > PADDLE_MAX_POSITION) {
            this.position = PADDLE_MAX_POSITION;
        }
    }
}