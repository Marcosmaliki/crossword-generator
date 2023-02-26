import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

//@ts-ignore
import clg from "crossword-layout-generator";
import { crosswordInputModelType, output } from "./generate.schema";
import { Database } from "fakebase";

const db = new Database("./data/");
const crosswords = db.table("crosswords");

//* generate Crossword Handler
export async function generateCrosswordHandler(
  req: FastifyRequest<{ Body: crosswordInputModelType }>,
  reply: FastifyReply
) {
  const inputJson = req.body.input;
  const level = req.body.level;

  if(inputJson.length < 5){
    return {
      success: false,
      message:'Please add atleast 5 clues to generate'
    }
  }

  if(inputJson.length > 20){
    return {
      success: false,
      message:'Puzzle too big, please shrink the clues down to utmost 20'
    }
  }

  const layout = clg.generateLayout(inputJson);
  const rows = layout.rows;
  const cols = layout.cols;
  const table = layout.table; // table as two-dimensional array
  // const outputHtml = layout.table_string; // table as plain text (with HTML line breaks)
  const outputJson: Array<output> = layout.result; // words along with orientation, position, startx, and starty
  // console.log(rows);
  // console.log(cols);
  // console.log(table);
  // console.log(outputHtml);

  const output: any = {};

  for (let i = 0; i < outputJson.length; i++) {
    const answer = outputJson[i].answer;
    const startx = outputJson[i].startx;
    const starty = outputJson[i].starty;

    outputJson[i].startIndex = cols * (starty - 1) + (startx - 1) + 1;

    console.log({ currentindex: i, answer });

    //* DOWN
    if (outputJson[i].orientation === "down") {
      const indexes: Array<number> = [];
      for (let j = 1; j < answer.length + 1; j++) {
        // let index = cols * (j - 1) + (startx - 1) + 1;
        let index = cols * (starty - 1) + (startx - 1) + cols * (j - 1);

        indexes.push(index + 1);
      }

      output[answer] = indexes;
      // words[outputJson[i].answer] = []
    } else {
      const indexes: Array<number> = [];
      for (let j = 1; j < answer.length + 1; j++) {
        let index = cols * (starty - 1) + (startx - 1) + j;
        indexes.push(index);
      }

      output[answer] = indexes;
    }
  }

  const crosswordOutput = {
    level,
    rows,
    cols,
    outputJson,
    solutions: table.flat(),
    words: output,
  };

  const newCrossword = await crosswords.create(crosswordOutput);

  return newCrossword;
}
