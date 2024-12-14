import type { WordCollection } from "../definitions";
import { addDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { wordCollectionsRef } from "./firebase";
import { getUserId } from "./utils";

export type CollectionDraft = Pick<
  WordCollection,
  "description" | "name" | "isPublic" | "tags" | "maxWords"
>;
export async function createWordCollection(
  draft: CollectionDraft,
): Promise<WordCollection> {
  try {
    // const ownerId = getUserId(createWordCollection.name);
    const {
      maxWords = 10,
      name = "mycol",
      description = "",
      isPublic = false,
      tags = [],
    } = draft;
    const collection: WordCollection = {
      collectionId: "",
      name,
      maxWords,
      createAt: dayjs().unix(),
      updateAt: dayjs().unix(),
      words: [],
      description,
      isPublic,
      ownerId: "dady",
      tags,
      wordCount: 0,
    };
    const docRef = await addDoc(wordCollectionsRef, collection);
    collection.collectionId = docRef.id;
    return collection;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
