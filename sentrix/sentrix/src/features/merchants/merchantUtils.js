export const computeMerchantStatus = (score) => {
    if (score > 85) return "Flagged";
    if (score > 60) return "Monitoring";
    return "Normal";
};
