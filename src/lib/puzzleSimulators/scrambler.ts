interface Cube {
  U: string[];
  R: string[];
  F: string[];
  D: string[];
  L: string[];
  B: string[];
}

const faceColors = {
  U: '#ffffff', // white
  R: '#ff0000', // red
  F: '#00ff00', // green
  D: '#ffff00', // yellow
  L: '#ff8800', // orange
  B: '#0000ff', // blue
};

function initializeCube(): Cube {
  return {
    U: Array(9).fill(faceColors.U),
    R: Array(9).fill(faceColors.R),
    F: Array(9).fill(faceColors.F),
    D: Array(9).fill(faceColors.D),
    L: Array(9).fill(faceColors.L),
    B: Array(9).fill(faceColors.B),
  };
}

function rotateFaceClockwise(face: string[]): void {
  const temp = face.slice();
  face[0] = temp[6];
  face[1] = temp[3];
  face[2] = temp[0];
  face[3] = temp[7];
  face[4] = temp[4];
  face[5] = temp[1];
  face[6] = temp[8];
  face[7] = temp[5];
  face[8] = temp[2];
}

function rotateFaceCounterClockwise(face: string[]): void {
  const temp = face.slice();
  face[0] = temp[2];
  face[1] = temp[5];
  face[2] = temp[8];
  face[3] = temp[1];
  face[4] = temp[4];
  face[5] = temp[7];
  face[6] = temp[0];
  face[7] = temp[3];
  face[8] = temp[6];
}

// Move functions
function moveU(cube: Cube): void {
  rotateFaceClockwise(cube.U);
  const temp = cube.F.slice(0, 3);

  cube.F[0] = cube.R[0];
  cube.F[1] = cube.R[1];
  cube.F[2] = cube.R[2];

  cube.R[0] = cube.B[0];
  cube.R[1] = cube.B[1];
  cube.R[2] = cube.B[2];

  cube.B[0] = cube.L[0];
  cube.B[1] = cube.L[1];
  cube.B[2] = cube.L[2];

  cube.L[0] = temp[0];
  cube.L[1] = temp[1];
  cube.L[2] = temp[2];
}

function moveUPrime(cube: Cube): void {
  rotateFaceCounterClockwise(cube.U);
  const temp = cube.F.slice(0, 3);

  cube.F[0] = cube.L[0];
  cube.F[1] = cube.L[1];
  cube.F[2] = cube.L[2];

  cube.L[0] = cube.B[0];
  cube.L[1] = cube.B[1];
  cube.L[2] = cube.B[2];

  cube.B[0] = cube.R[0];
  cube.B[1] = cube.R[1];
  cube.B[2] = cube.R[2];

  cube.R[0] = temp[0];
  cube.R[1] = temp[1];
  cube.R[2] = temp[2];
}

function moveD(cube: Cube): void {
  rotateFaceClockwise(cube.D);
  const temp = [cube.F[6], cube.F[7], cube.F[8]];

  cube.F[6] = cube.L[6];
  cube.F[7] = cube.L[7];
  cube.F[8] = cube.L[8];

  cube.L[6] = cube.B[6];
  cube.L[7] = cube.B[7];
  cube.L[8] = cube.B[8];

  cube.B[6] = cube.R[6];
  cube.B[7] = cube.R[7];
  cube.B[8] = cube.R[8];

  cube.R[6] = temp[0];
  cube.R[7] = temp[1];
  cube.R[8] = temp[2];
}

function moveDPrime(cube: Cube): void {
  rotateFaceCounterClockwise(cube.D);
  const temp = [cube.F[6], cube.F[7], cube.F[8]];

  cube.F[6] = cube.R[6];
  cube.F[7] = cube.R[7];
  cube.F[8] = cube.R[8];

  cube.R[6] = cube.B[6];
  cube.R[7] = cube.B[7];
  cube.R[8] = cube.B[8];

  cube.B[6] = cube.L[6];
  cube.B[7] = cube.L[7];
  cube.B[8] = cube.L[8];

  cube.L[6] = temp[0];
  cube.L[7] = temp[1];
  cube.L[8] = temp[2];
}

function moveR(cube: Cube): void {
  rotateFaceClockwise(cube.R);
  const temp = [cube.U[2], cube.U[5], cube.U[8]];

  cube.U[2] = cube.F[2];
  cube.U[5] = cube.F[5];
  cube.U[8] = cube.F[8];

  cube.F[2] = cube.D[2];
  cube.F[5] = cube.D[5];
  cube.F[8] = cube.D[8];

  cube.D[2] = cube.B[6];
  cube.D[5] = cube.B[3];
  cube.D[8] = cube.B[0];

  cube.B[6] = temp[0];
  cube.B[3] = temp[1];
  cube.B[0] = temp[2];
}

function moveRPrime(cube: Cube): void {
  rotateFaceCounterClockwise(cube.R);
  const temp = [cube.U[2], cube.U[5], cube.U[8]];

  cube.U[2] = cube.B[6];
  cube.U[5] = cube.B[3];
  cube.U[8] = cube.B[0];

  cube.B[6] = cube.D[2];
  cube.B[3] = cube.D[5];
  cube.B[0] = cube.D[8];

  cube.D[2] = cube.F[2];
  cube.D[5] = cube.F[5];
  cube.D[8] = cube.F[8];

  cube.F[2] = temp[0];
  cube.F[5] = temp[1];
  cube.F[8] = temp[2];
}

function moveL(cube: Cube): void {
  rotateFaceClockwise(cube.L);
  const temp = [cube.U[0], cube.U[3], cube.U[6]];

  cube.U[0] = cube.B[8];
  cube.U[3] = cube.B[5];
  cube.U[6] = cube.B[2];

  cube.B[8] = cube.D[0];
  cube.B[5] = cube.D[3];
  cube.B[2] = cube.D[6];

  cube.D[0] = cube.F[0];
  cube.D[3] = cube.F[3];
  cube.D[6] = cube.F[6];

  cube.F[0] = temp[0];
  cube.F[3] = temp[1];
  cube.F[6] = temp[2];
}

function moveLPrime(cube: Cube): void {
  rotateFaceCounterClockwise(cube.L);
  const temp = [cube.U[0], cube.U[3], cube.U[6]];

  cube.U[0] = cube.F[0];
  cube.U[3] = cube.F[3];
  cube.U[6] = cube.F[6];

  cube.F[0] = cube.D[0];
  cube.F[3] = cube.D[3];
  cube.F[6] = cube.D[6];

  cube.D[0] = cube.B[8];
  cube.D[3] = cube.B[5];
  cube.D[6] = cube.B[2];

  cube.B[8] = temp[0];
  cube.B[5] = temp[1];
  cube.B[2] = temp[2];
}

function moveF(cube: Cube): void {
  rotateFaceClockwise(cube.F);
  const temp = [cube.U[6], cube.U[7], cube.U[8]];

  cube.U[6] = cube.L[8];
  cube.U[7] = cube.L[5];
  cube.U[8] = cube.L[2];

  cube.L[8] = cube.D[2];
  cube.L[5] = cube.D[1];
  cube.L[2] = cube.D[0];

  cube.D[0] = cube.R[6];
  cube.D[1] = cube.R[3];
  cube.D[2] = cube.R[0];

  cube.R[0] = temp[0];
  cube.R[3] = temp[1];
  cube.R[6] = temp[2];
}

function moveFPrime(cube: Cube): void {
  rotateFaceCounterClockwise(cube.F);
  const temp = [cube.U[6], cube.U[7], cube.U[8]];

  cube.U[6] = cube.R[0];
  cube.U[7] = cube.R[3];
  cube.U[8] = cube.R[6];

  cube.R[6] = cube.D[0];
  cube.R[3] = cube.D[1];
  cube.R[0] = cube.D[2];

  cube.D[0] = cube.L[2];
  cube.D[1] = cube.L[5];
  cube.D[2] = cube.L[8];

  cube.L[2] = temp[2];
  cube.L[5] = temp[1];
  cube.L[8] = temp[0];
}

function moveB(cube: Cube): void {
  rotateFaceClockwise(cube.B);
  const temp = [cube.U[0], cube.U[1], cube.U[2]];

  cube.U[0] = cube.R[2];
  cube.U[1] = cube.R[5];
  cube.U[2] = cube.R[8];

  cube.R[2] = cube.D[8];
  cube.R[5] = cube.D[7];
  cube.R[8] = cube.D[6];

  cube.D[6] = cube.L[0];
  cube.D[7] = cube.L[3];
  cube.D[8] = cube.L[6];

  cube.L[0] = temp[2];
  cube.L[3] = temp[1];
  cube.L[6] = temp[0];
}

function moveBPrime(cube: Cube): void {
  rotateFaceCounterClockwise(cube.B);
  const temp = [cube.U[0], cube.U[1], cube.U[2]];

  cube.U[0] = cube.L[6];
  cube.U[1] = cube.L[3];
  cube.U[2] = cube.L[0];

  cube.L[0] = cube.D[6];
  cube.L[3] = cube.D[7];
  cube.L[6] = cube.D[8];

  cube.D[6] = cube.R[8];
  cube.D[7] = cube.R[5];
  cube.D[8] = cube.R[2];

  cube.R[2] = temp[0];
  cube.R[5] = temp[1];
  cube.R[8] = temp[2];
}

function applyMove(cube: Cube, move: string): void {
  switch (move) {
    case 'U':
      moveU(cube);
      break;
    case "U'":
      moveUPrime(cube);
      break;
    case 'U2':
      moveU(cube);
      moveU(cube);
      break;
    case 'D':
      moveD(cube);
      break;
    case "D'":
      moveDPrime(cube);
      break;
    case 'D2':
      moveD(cube);
      moveD(cube);
      break;
    case 'R':
      moveR(cube);
      break;
    case "R'":
      moveRPrime(cube);
      break;
    case 'R2':
      moveR(cube);
      moveR(cube);
      break;
    case 'L':
      moveL(cube);
      break;
    case "L'":
      moveLPrime(cube);
      break;
    case 'L2':
      moveL(cube);
      moveL(cube);
      break;
    case 'F':
      moveF(cube);
      break;
    case "F'":
      moveFPrime(cube);
      break;
    case 'F2':
      moveF(cube);
      moveF(cube);
      break;
    case 'B':
      moveB(cube);
      break;
    case "B'":
      moveBPrime(cube);
      break;
    case 'B2':
      moveB(cube);
      moveB(cube);
      break;
    default:
      console.warn(`Unknown move: ${move}`);
  }
}

function applyScramble(cube: Cube, scramble: string): void {
  const moves = scramble.trim().split(/\s+/);
  moves.forEach((move) => {
    applyMove(cube, move);
  });
}

let sideLength = 60; // in pixels
let puzzleSize: number;
let stickerSize: number; // in pixels
let marginSize: number;
setPuzzleSize(3);

function setPuzzleSize(size: number): void {
  puzzleSize = size;
  stickerSize = sideLength / puzzleSize;
  marginSize = sideLength / 9;
}

function drawFace(face: string[], offsetX: number, offsetY: number): string {
  let svg = '';
  for (let i = 0; i < puzzleSize**2; i++) {
    const x = offsetX + (i % puzzleSize) * stickerSize;
    const y = offsetY + Math.floor(i / puzzleSize) * stickerSize;
    const color = face[i];

    svg += `<rect x="${x}" y="${y}" width="${stickerSize}" height="${stickerSize}" fill="${color}" stroke="black"/>\n`;
  }
  return svg;
}

function generateSVG(cube: Cube): string {
  let svg = '';
  const width  = stickerSize * puzzleSize * 4 + marginSize * 3;
  const height = stickerSize * puzzleSize * 3 + marginSize * 2;

  svg += `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">\n`;

  // Draw faces
  svg += drawFace(cube.U, sideLength     + marginSize        , 0);                               // Up face
  svg += drawFace(cube.L, 0                                  , sideLength     + marginSize);     // Left face
  svg += drawFace(cube.F, sideLength     + marginSize        , sideLength     + marginSize);     // Front face
  svg += drawFace(cube.R, sideLength * 2 + marginSize * 2    , sideLength     + marginSize);     // Right face
  svg += drawFace(cube.B, sideLength * 3 + marginSize * 3    , sideLength     + marginSize);     // Back face
  svg += drawFace(cube.D, sideLength     + marginSize        , sideLength * 2 + marginSize * 2); // Down face

  svg += '</svg>';

  return svg;
}

function convertCubeto2x2(cube: Cube) {
  const newCube = {
    U: [cube.U[0], cube.U[2], cube.U[6], cube.U[8]],
    R: [cube.R[0], cube.R[2], cube.R[6], cube.R[8]],
    F: [cube.F[0], cube.F[2], cube.F[6], cube.F[8]],
    D: [cube.D[0], cube.D[2], cube.D[6], cube.D[8]],
    L: [cube.L[0], cube.L[2], cube.L[6], cube.L[8]],
    B: [cube.B[0], cube.B[2], cube.B[6], cube.B[8]],
  };
  return newCube;
}

function generateRubiksCubeSVG(scramble: string): string {
  let cube = initializeCube();
  applyScramble(cube, scramble);
  if (puzzleSize === 2) {
    cube = convertCubeto2x2(cube);
  }
  const svg = generateSVG(cube);
  return svg;
}

export function draw2x2Scramble(scramble: string): string {
  setPuzzleSize(2);
  return generateRubiksCubeSVG(scramble);
}

export function draw3x3Scramble(scramble: string): string {
  setPuzzleSize(3);
  return generateRubiksCubeSVG(scramble);
}

export function get2x2Scramble(): string {
  return generateRubiksCubeScramble(['R', 'U', 'F'], 10);
}

export function get3x3Scramble(): string {
  return generateRubiksCubeScramble();
}

function generateRubiksCubeScramble(moves: ('U' | 'D' | 'L' | 'R' | 'F' | 'B')[] = ['R', 'U', 'D', 'L', 'F', 'B'], scrambleLength: number = 20): string {
  const mirrorMoves = {
    'U': 'D',
    'D': 'U',
    'R': 'L',
    'L': 'R',
    'F': 'B',
    'B': 'F',
  };
  const modifiers: ('' | "'" | "2")[] = ['', "'", '2'];
  let scramble: string[] = [];

  // Generate scramble moves
  for (let i = 0; i < scrambleLength; i++) {
    let move: 'U' | 'D' | 'L' | 'R' | 'F' | 'B';
    let modifier: '' | "'" | "2";

    do {
      move = moves[Math.floor(Math.random() * moves.length)];
    } while (
      scramble.length > 0 &&
      (move === scramble[scramble.length - 1][0] || // Prevent same move twice in a row
      (scramble.length > 1 &&
        scramble[scramble.length - 1][0] === mirrorMoves[move] &&
        move === scramble[scramble.length - 2][0]) // Prevent mirror moves twice in a row
      )
    );

    modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble.push(move + modifier);
  }

	return scramble.join(" ");
}
