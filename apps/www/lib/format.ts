export function formatCompactNumber(value: number) {
    if (!value) return null;
    if (value >= 100 && value < 1000) {
        return value.toString(); // Keep the number as is if it's in the hundreds
    } else if (value >= 1000 && value < 1000000) {
        return (value / 1000).toFixed(1) + "k"; // Convert to 'k' for thousands
    } else if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + "M"; // Convert to 'M' for millions
    } else {
        return value.toString(); // Optionally handle numbers less than 100 if needed
    }
}
