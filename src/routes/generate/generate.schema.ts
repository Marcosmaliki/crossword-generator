import { Static, Type } from "@sinclair/typebox";

enum levelEnum {
  EASY = "EASY",
  MEDUIM = "MEDUIM",
  HARD = "HARD",
}

const level = Type.Enum(levelEnum);

const crosswordInput = Type.Object({
  clue: Type.String(),
  answer: Type.String(),
});

const crosswordInputModel = Type.Object({
  level,
  input: Type.Array(crosswordInput),
});

type crosswordInputModelType = Static<typeof crosswordInputModel>;


interface output {
    clue: string;
    answer: string;
    startx: number;
    starty: number;
    orientation: string;
    position: number;
    startIndex?: number;
  }
  

export { crosswordInputModel, crosswordInputModelType, output , level, levelEnum};
