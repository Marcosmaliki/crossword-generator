import { Static, Type } from "@sinclair/typebox";



const crosswordId = Type.Object({
  id: Type.String(),
});


type crosswordIdType = Static<typeof crosswordId>;


  

export { crosswordId, crosswordIdType};
