export const calculateRiskScore = ({ amount, velocity, frequency }) => {
    let score = 0;
    score += amount > 100000 ? 40 : amount > 50000 ? 20 : 10;
    score += velocity > 10 ? 30 : 10;
    score += frequency > 5 ? 30 : 10;
    return Math.min(100, Math.max(0, score));
};

export const riskLevel = (score) => {
    if (score >= 75) return "high";
    if (score >= 40) return "medium";
    return "low";
};
