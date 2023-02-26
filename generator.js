const MAX_GRID_SIZE = 25;

function generateCrossword(clues, answers, size) {
    console.log('generating crossword');
  if (size > MAX_GRID_SIZE) {
    console.error("Error: maximum grid size is " + MAX_GRID_SIZE);
    return null;
  }

  const grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = "_";
    }
  }

  for (let i = 0; i < answers.length; i++) {
    let word = answers[i];
    let clue = clues[i];
    let direction = Math.random() >= 0.5 ? "across" : "down";

    let startRow, startCol;
    if (direction === "across") {
      startRow = Math.floor(Math.random() * size);
      startCol = Math.floor(Math.random() * (size - word.length + 1));
      for (let j = 0; j < word.length; j++) {
        if (grid[startRow][startCol + j] !== "_" && grid[startRow][startCol + j] !== word.charAt(j)) {
          // If there's a conflict, try again with a different starting position.
          i--;
          break;
        }
        grid[startRow][startCol + j] = word.charAt(j);
      }
    } else {
      startRow = Math.floor(Math.random() * (size - word.length + 1));
      startCol = Math.floor(Math.random() * size);
      for (let j = 0; j < word.length; j++) {
        if (grid[startRow + j][startCol] !== "_" && grid[startRow + j][startCol] !== word.charAt(j)) {
          // If there's a conflict, try again with a different starting position.
          i--;
          break;
        }
        grid[startRow + j][startCol] = word.charAt(j);
      }
    }
  }

  return grid;
}

function generateCrossword2(clues, answers, rows, cols) {
    if (rows > MAX_GRID_SIZE || cols > MAX_GRID_SIZE) {
      console.error("Error: maximum grid size is " + MAX_GRID_SIZE);
      return null;
    }
  
    const grid = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = "_";
      }
    }
  
    for (let i = 0; i < answers.length; i++) {
      let word = answers[i];
      let clue = clues[i];
      let direction = Math.random() >= 0.5 ? "across" : "down";
  
      let startRow, startCol;
      if (direction === "across") {
        startRow = Math.floor(Math.random() * rows);
        startCol = Math.floor(Math.random() * (cols - word.length + 1));
        for (let j = 0; j < word.length; j++) {
          if (grid[startRow][startCol + j] !== "_" && grid[startRow][startCol + j] !== word.charAt(j)) {
            // If there's a conflict, try again with a different starting position.
            i--;
            break;
          }
          grid[startRow][startCol + j] = word.charAt(j);
        }
      } else {
        startRow = Math.floor(Math.random() * (rows - word.length + 1));
        startCol = Math.floor(Math.random() * cols);
        for (let j = 0; j < word.length; j++) {
          if (grid[startRow + j][startCol] !== "_" && grid[startRow + j][startCol] !== word.charAt(j)) {
            // If there's a conflict, try again with a different starting position.
            i--;
            break;
          }
          grid[startRow + j][startCol] = word.charAt(j);
        }
      }
    }
  
    return grid;
  }



  function generateCrossword3(clues, answers, rows, cols) {
    if (rows > MAX_GRID_SIZE || cols > MAX_GRID_SIZE) {
      console.error("Error: maximum grid size is " + MAX_GRID_SIZE);
      return null;
    }
  
    const grid = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = "_";
      }
    }
  
    const crosswordDefinition = [];
    for (let i = 0; i < answers.length; i++) {
      let answerIndex = Math.floor(Math.random() * answers.length);
      let word = answers[answerIndex];
      answers.splice(answerIndex, 1);
  
      let direction = Math.random() >= 0.5 ? "across" : "down";
  
      let startRow, startCol;
      if (direction === "across") {
        startRow = Math.floor(Math.random() * rows);
        startCol = Math.floor(Math.random() * (cols - word.length + 1));
        for (let j = 0; j < word.length; j++) {
          if (grid[startRow][startCol + j] !== "_" && grid[startRow][startCol + j] !== word.charAt(j)) {
            // If there's a conflict, try again with a different starting position.
            i--;
            break;
          }
          grid[startRow][startCol + j] = word.charAt(j);
        }
      } else {
        startRow = Math.floor(Math.random() * (rows - word.length + 1));
        startCol = Math.floor(Math.random() * cols);
        for (let j = 0; j < word.length; j++) {
          if (grid[startRow + j][startCol] !== "_" && grid[startRow + j][startCol] !== word.charAt(j)) {
            // If there's a conflict, try again with a different starting position.
            i--;
            break;
          }
          grid[startRow + j][startCol] = word.charAt(j);
        }
      }
  
      let clueIndex = Math.floor(Math.random() * clues.length);
      let clue = clues[clueIndex];
  
      crosswordDefinition.push({
        answer: word,
        startx: startCol,
        starty: startRow,
        orientation: direction,
        position: i + 1,
        clue: clue,
      });
    }
  
    return crosswordDefinition;
  }



function generateCrossword4(clues, answers, rows, cols) {
  if (rows > MAX_GRID_SIZE || cols > MAX_GRID_SIZE) {
    console.error("Error: maximum grid size is " + MAX_GRID_SIZE);
    return null;
  }

  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = "_";
    }
  }

  const crosswordDefinition = [];
  for (let i = 0; i < answers.length; i++) {
    let answerIndex = Math.floor(Math.random() * answers.length);
    let word = answers[answerIndex];
    answers.splice(answerIndex, 1);

    let direction = Math.random() >= 0.5 ? "across" : "down";

    let startRow, startCol;
    if (direction === "across") {
      startRow = Math.floor(Math.random() * rows);
      startCol = Math.floor(Math.random() * (cols - word.length + 1));
      for (let j = 0; j < word.length; j++) {
        if (grid[startRow][startCol + j] !== "_" && grid[startRow][startCol + j] !== word.charAt(j)) {
          // If there's a conflict, try again with a different starting position.
          i--;
          break;
        }
        grid[startRow][startCol + j] = word.charAt(j);
      }
    } else {
      startRow = Math.floor(Math.random() * (rows - word.length + 1));
      startCol = Math.floor(Math.random() * cols);
      for (let j = 0; j < word.length; j++) {
        if (grid[startRow + j][startCol] !== "_" && grid[startRow + j][startCol] !== word.charAt(j)) {
          // If there's a conflict, try again with a different starting position.
          i--;
          break;
        }
        grid[startRow + j][startCol] = word.charAt(j);
      }
    }

    let clueIndex = Math.floor(Math.random() * clues.length);
    let clue = clues[clueIndex];

    crosswordDefinition.push({
      answer: word,
      startx: startCol,
      starty: startRow,
      orientation: direction,
      position: i + 1,
      clue: clue,
    });
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "_") {
        grid[i][j] = "-";
      }
    }
  }

  return {
    crosswordDefinition: crosswordDefinition,
    layoutGrid: grid,
  };
}

  



let clues = ['courage',
'wind',
'blue',
'half',
'bride',
'bacon',
'convert',
'species',
'week',
'charity',
'major',
'countryside',
'pray',
'sound',
'recession','bully',
'Solomon',
'googlemaps'];
let answers = ['courage',
'wind',
'blue',
'half',
'bride',
'bacon',
'convert',
'species',
'week',
'charity',
'major',
'countryside',
'pray',
'sound',
'recession',
'bully',
'Solomon',
'googlemaps'];
let size = 17, rows= 12, columns =12;

// console.log(generateCrossword(clues, answers, size))
console.log(generateCrossword4(clues, answers, rows, columns))


