export class RateLimiter {
    private requests: Map<string, number[]>;
    private cleanupInterval: NodeJS.Timeout;

    constructor(private cleanupMs: number = 60000) {
        this.requests = new Map();
        // Periodically cleanup old entries to prevent memory leaks
        this.cleanupInterval = setInterval(() => this.cleanup(), this.cleanupMs);
    }

    /**
     * Check if a request is allowed.
     * Uses a sliding window algorithm.
     * 
     * @param key Unique identifier (e.g., IP address)
     * @param limit Maximum number of requests allowed
     * @param windowMs Time window in milliseconds
     * @returns true if allowed, false if limit exceeded
     */
    check(key: string, limit: number, windowMs: number): boolean {
        const now = Date.now();
        const windowStart = now - windowMs;

        let timestamps = this.requests.get(key) || [];

        // Filter out timestamps outside the testing window
        timestamps = timestamps.filter(t => t > windowStart);

        if (timestamps.length >= limit) {
            // Update map with cleaned timestamps even if blocked
            this.requests.set(key, timestamps);
            return false;
        }

        timestamps.push(now);
        this.requests.set(key, timestamps);
        return true;
    }

    private cleanup() {
        const now = Date.now();
        // Default window for cleanup consideration (e.g., 1 hour)
        // We assume mostly short windows, but keeping data for 1h is safe
        const maxWindow = 3600000;

        for (const [key, timestamps] of this.requests.entries()) {
            const validTimestamps = timestamps.filter(t => t > now - maxWindow);
            if (validTimestamps.length === 0) {
                this.requests.delete(key);
            } else {
                this.requests.set(key, validTimestamps);
            }
        }
    }

    // Graceful shutdown
    stop() {
        clearInterval(this.cleanupInterval);
    }
}

// Singleton instance for the application
export const rateLimiter = new RateLimiter();
