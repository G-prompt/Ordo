export const createAlert = (title, description, level = "medium") => ({
    title,
    description,
    level,
    timestamp: new Date().toISOString(),
});
