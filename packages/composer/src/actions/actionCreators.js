import uuidv4 from "uuid/v4";

export function createStory({
  author = "",
  authorLink = "",
  context = "",
  interviewees = [],
  intro = "",
  media = {},
  pubDate = "",
  title = ""
}) {
  return {
    type: "CREATE_STORY",
    payload: {
      author,
      authorLink,
      context,
      interviewees,
      intro,
      media,
      pubDate,
      title,
      id: uuidv4(),
      modDate: new Date()
    }
  };
}

export function updateStory(data, i) {
  return {
    type: "UPDATE_STORY",
    i,
    payload: data
  };
}

export function deleteStory(i) {
  return {
    type: "DELETE_STORY",
    i
  };
}
