export const RANDOM_COLORS = [
    "#e1bee7", "#c5cae9",
    "#b2dfdb", "#f0f4c3",
    "#ffccbc", "#cfd8dc",


    "#6a1b9a", "#283593",
    "#00838f", "#2e7d32",
    "#ef6c00", "#d84315",
    "#37474f", "#f50057"
]

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomColor(){
    const index = randomInteger(0,5)
    return RANDOM_COLORS[index];
}