import React, { useState } from 'react';

const HomeContainer = () => {
    const [finalOutput, setFinalOutput] = useState("");

    const moveToPos = (pos: string[], move: string) => {
        // pos = [1, 3, N], 'M'
        let newPos: any = pos;
        switch (move) {
            case 'L':
                switch (pos[2]) {
                    case 'N':
                        newPos[2] = 'W';
                        break;
                    case 'S':
                        newPos[2] = 'E';
                        break;
                    case 'E':
                        newPos[2] = 'N';
                        break;
                    case 'W':
                        newPos[2] = 'S';
                        break;
                    default:
                        break;
                }
                break;
            case 'R':
                switch (pos[2]) {
                    case 'N':
                        newPos[2] = 'E';
                        break;
                    case 'S':
                        newPos[2] = 'W';
                        break;
                    case 'E':
                        newPos[2] = 'S';
                        break;
                    case 'W':
                        newPos[2] = 'N';
                        break;
                    default:
                        break;
                }
                break;
            default:
                switch (pos[2]) {
                    case 'N':
                        newPos[1] = parseInt(newPos[1])+1;
                        break;
                    case 'S':
                        newPos[1] = parseInt(newPos[1])-1;
                        break;
                    case 'E':
                        newPos[0] = parseInt(newPos[0])+1;
                        break;
                    case 'W':
                        newPos[0] = parseInt(newPos[0])-1;
                        break;
                    default:
                        break;
                }
                break;
        }

        return newPos;
    };

    const movements = (inst: string[]) => {
        const res: any[] = [];
        for (let i = 5; i < inst.length; i+=4) {
            let position = [inst[i-3], inst[i-2], inst[i-1]];
            for (let j = 0; j < inst[i].length; j++) {
                position = moveToPos(position, inst[i][j]);
            }
            res.push(position);
        }

        return res;
    };

    const output = (moves: string) => {
        let data = moves.replace(/\n/g, " ");
        const fullMoves = data.split(" ");

        const lastPositions = movements(fullMoves);

        let newResultString = "";
        for (let index = 0; index < lastPositions.length; index++) {
            let auxString = lastPositions[index].toString();
            auxString = lastPositions[index].toString();
            auxString = auxString.replace(/,/g, " ");
            auxString = "Rover "+ (index + 1) + ") " + auxString + "\n";
            newResultString = newResultString + auxString;
        }
        setFinalOutput(newResultString);
    };

    return <form onSubmit={(e: React.SyntheticEvent) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        dataRovers: { value: string };
      };
      const moves = target.dataRovers.value; // typechecks!
      output(moves);
    }}
  >
    <div>
      <label>
        Instructions:
        <textarea name='dataRovers' rows={10} cols={30}></textarea>
      </label>
    </div>
    <div>
      <input type="submit" value="Result" />
    </div>
    <div>
        <label>
            Result: <p style={{ width: 200 }}>{finalOutput}</p>
        </label>
    </div>
  </form>
};

export default HomeContainer;