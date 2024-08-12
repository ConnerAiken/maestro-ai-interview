const fs = require('fs').promises;

/**
 * Takes a file name and returns a promise with a grid of characters
 * @param {string} fileName 
 * @returns 
 */
const getDataSet = async (fileName) => { 
    try {
        const data = await fs.readFile(fileName, 'utf-8');
        const lines = data.split('\n');
 
        return lines;
    } catch (error) {
        console.error('Error reading file:', error);
    }
};

/**
 * Counts the number of connected shapes in a grid of '1's and '0's
 * @param {String[]} grid - A 2D grid of characters
 * @returns 
 */
function countConnectedShapes(grid) {
    let shapeCount = 0; 
    const n = grid.length;
    const visited = Array.from({ length: n }, () => Array(n).fill(false));

    // Directions for moving up, down, left, and right
    const directions = [
        [-1, 0], // up
        [1, 0],  // down
        [0, -1], // left
        [0, 1]   // right
    ];

    /**
     * Checks all 4 directions of a cell to see if there are any connected '1's
     * @param {number} x 
     * @param {number} y 
     */
    function depthFirstSearch(x, y) {
        // Mark this cell as visited
        visited[x][y] = true;

        // Check all 4 possible directions
        for (let [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            // If the new position is valid, contains a '1', and has not been visited, continue search
            if (
                newX >= 0 && newX < n &&
                newY >= 0 && newY < n &&
                grid[newX][newY] === '1' &&
                !visited[newX][newY]
            ) {
                depthFirstSearch(newX, newY);
            }
        }
    }
 
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // If we find an unvisited '1', it's a new shape
            if (grid[i][j] === '1' && !visited[i][j]) {
                shapeCount++;
                depthFirstSearch(i, j);
            }
        }
    }

    return shapeCount;
}

getDataSet('data_demo.txt').then(matrix => {  
    console.log(countConnectedShapes(matrix));
});