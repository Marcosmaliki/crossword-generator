import { FastifyPluginAsync } from "fastify";
//@ts-ignore
import clg from "crossword-layout-generator";
import { generateCrosswordHandler } from "./generate.controller";
import { crosswordInputModel } from "./generate.schema";

interface output {
  clue: string;
  answer: string;
  startx: number;
  starty: number;
  orientation: string;
  position: number;
  startIndex?: number;
}



const generate: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  //* generate crossword
  fastify.post('', {
    // preValidation: fastify.authenticate,
    schema: {
      tags: ["Generate"],
      body: crosswordInputModel
    },
    handler: generateCrosswordHandler 
  });
      

  fastify.post("/nada", {
     schema:{
      
     }
  },
  async function (request, reply) {
    //TODO: this will be a get request - will need the Q&A json and will return the crossword builder and the level of difficulty

    const inputJson = [
      {
        clue: "that which is established as a rule or model by authority, custom, or general consent",
        answer: "standard",
      },
      { clue: "a machine that computes", answer: "computer" },
      {
        clue: "the collective designation of items for a particular purpose",
        answer: "equipment",
      },
      { clue: "an opening or entrance to an inclosed place", answer: "port" },
      {
        clue: "a point where two things can connect and interact",
        answer: "interface",
      },
    ];

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

    /**
     * 1.
     */

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

    return {
      rows,
      cols,
      outputJson,
      solutions: table.flat(),
      words: output,
    };
  });

};

export default generate;
