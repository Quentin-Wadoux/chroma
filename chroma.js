const { ChromaClient, OpenAIEmbeddingFunction } = require("chromadb");
const key = require("./key.json");

//init client
const client = new ChromaClient();

//init embedder
const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: key.openaiKey,
});

const createCollection = async () => {
  const collection = await client.createCollection({
    name: "my-collection",
    embeddingFunction: embedder,
  });
};

const getCollection = async () => {
  return client.getCollection({
    name: "my-collection",
    embeddingFunction: embedder,
  });
};

const addDataToCollection = async () => {
  const collection = await getCollection();

  await collection.add({
    ids: ["id1", "id2", "id3", "id4", "id5", "id6", "id7", "id8", "id9"],
    metadatas: [
      { source: "présidence US" },
      { source: "présidence US" },
      { source: "présidence US" },
      { source: "présidence FR" },
      { source: "présidence ALL" },
      { source: "dev ONK" },
      { source: "dev ONK" },
      { source: "dev ONK" },
      { source: "dev ONK" },
    ],
    documents: [
      "Donald trump est le 45ème président des USA",
      "Barack Obama est le 44ème président des USA",
      "Joe Biden est le 46ème et l'actuel président des USA ",
      "Emmanuel Macron est le président de la France",
      "Angela Merkel est la chancelière de l'Allemagne",
      "Valentin est développeur pour la team Claims",
      "Quentin est développeur pour la team Claims",
      "Paul est développeur pour la team Claims",
      "Yohan est développeur pour la A team",
    ],
  });
};

const seeCollection = async () => {
  const collection = await getCollection();
  console.log(await collection.peek());
};

const getResults = async () => {
  const collection = await getCollection();

  const results = await collection.query({
    nResults: 1,
    queryTexts: [
      "Qui est le président des USA aujourd'hui ?",
      "Qui est le président français ?",
      "Donne moi le 44ème président américain",
    ],
  });

  console.table(results);

  const results2 = await collection.query({
    nResults: 3,
    queryTexts: ["Comment cuisiner des nouilles ?"],
  });

  console.table(results2);
};

getResults();
