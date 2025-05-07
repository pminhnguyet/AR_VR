export async function fetchModelById(id) {
    try {
        const response = await fetch("https://agri-solar-be.onrender.com/models");
        if (!response.ok) {
            throw new Error("Failed to fetch models");
        }
        const data = await response.json();
        const model = data.find((item) => item.id === id);
        if (!model) {
            throw new Error(`Model with id ${id} not found`);
        }
        return model;
    } catch (error) {
        console.error("Error fetching model:", error);
        throw error;
    }
}