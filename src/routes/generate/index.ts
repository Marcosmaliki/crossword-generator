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
      

  fastify.get("/nada", {
     schema:{
      
     }
  },
  async function (request, reply) {
    //TODO: this will be a get request - will need the Q&A json and will return the crossword builder and the level of difficulty

   


    const inputJson = [
      {
        clue: "Came across a record concerning journalist (10)",
        answer: "discover"},
      {
        clue: "Language of old city belonging to the French (4)",
        answer: "urdu"
      }, {
        clue: "They'll get wrongly blamed for heading off escape by animals (10)",
        answer: "scapegoats"
      }, {
        clue: "There's potato in Mum's pudding (4)",
        answer: "spud"
      }, {
        clue: "Style of cooking providing contrasts (5-3-4)",
        answer: "sweetandsour"
      }, {
        clue: "Country-loving Irishman in charge of containing disturbance (9)",
        answer: "patriot"
      }, {
        clue: "Giving note to terrorists makes one angry (5)",
        answer: "irate"
      }, {
        clue: "One who latches on to another is a sucker (5)",
        answer: "LEECH"
      }, {
        clue: " Sailor's intent perhaps is to be self-restrained (9)",
        answer: "abstinent"
      },
      {
        clue:'A comment sure upset in due proportion (12)',
        answer:'commensurate'
      }, {
        clue:'Man told to get on his knees? (4)',
        answer:'neil'
      }, {
        clue:'Boundary rope may produce such a decision (10)',
        answer:'borderline'
      }, {
        clue:'E.g. dogs returning from walk (4)',
        answer:'steps'
      }, {
        clue:'Not quite one\'s best friend on the ship (6,4)',
        answer:'secondmate'
      },
      //down
      {
        clue: "Pretty girl gets some food (4)",
        answer: "dish"
      }, {
        clue: "Animal found in sea location (4)",
        answer: "seal"
      }, {
        clue: "Fat little Edward is biased (12)",
        answer: "OVERWEIGHTED"
      },
      {
        clue: "The First Lady touring Oklahoma will awaken memories (5)",
        answer: "evoke"
      },{
        clue: "The thresholds of delights (9)",
        answer: "ENTRANCES"
      },
      {
        clue:' Below, below, below (10)',
        answer:'underneath'
      }, {
        clue:' Managed to get clergyman in dead awkward situation (12)',
        answer:'administered'
      }, {
        clue:' They are seeking work after demolition of aspic plant (10)',
        answer:'applicants'
      }, {
        clue:'Steam railway takes on head of Railtrack to improve efficiency (10)',
        answer:'streamline'
      }, {
        clue:'To perform in a different key, one\'s parts must be arranged (9)',
        answer:'transpose'
      }, {
        clue:'Went on horseback round cowboy show (5)',
        answer:'rodeo'
      }, {
        clue:' Junk mail from the capital (4)',
        answer:'lima'
      }, {
        clue:' Nothing but a lake (4)',
        answer:'mere'
      },
    ];

    const layout = clg.generateLayout(inputJson);
    const rows = layout.rows;
    const cols = layout.cols;
    const table = layout.table; // table as two-dimensional array
    const outputHtml = layout.table_string; // table as plain text (with HTML line breaks)
    const outputJson: Array<output> = layout.result; // words along with orientation, position, startx, and starty
    // console.log(rows);
    // console.log(cols);
    // console.log(table);
    console.log(outputHtml);

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
