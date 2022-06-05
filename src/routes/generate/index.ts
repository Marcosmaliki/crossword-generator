import { FastifyPluginAsync } from "fastify";
//@ts-ignore
import clg from "crossword-layout-generator";

const generate: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {

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
    const outputHtml = layout.table_string; // table as plain text (with HTML line breaks)
    const outputJson = layout.result; // words along with orientation, position, startx, and starty
    console.log(rows);
    console.log(cols);
    console.log(table);
    console.log(outputHtml);

    return { rows,cols, outputJson, outputHtml, table };

    
  });
};

export default generate;
