import Articles from "../../../../components/Articles";
import "../style.scss";
import { getArticles } from "../../../../store/dataSlice";
import store from "../../../../store";

const NewsList = async ({ params }: { params: { id: string } }) => {
  const sourceName = params.id.split("-").join(" ");
  await store.dispatch(getArticles(sourceName || ""));
  const articles = await store.getState().dataSlice.articles;

  return <Articles articles={articles} />;
};

export default NewsList;
