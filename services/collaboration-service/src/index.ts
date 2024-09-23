import { Database } from "@hocuspocus/extension-database";
import { Hocuspocus } from "@hocuspocus/server";

const server = new Hocuspocus({
  onChange: async ({ document }) => {
    // Can use this to e.g. trigger chatgpt on a new chat item
    console.log("Changed", document.getText("monaco").toJSON());
  },
  extensions: [
    new Database({
      store: async ({ documentName, document }) => {
        console.log("Storing document", documentName);
        console.log("Document to save", document.getText("monaco").toJSON());
      },
    }),
  ],
});

server.listen(4000);
