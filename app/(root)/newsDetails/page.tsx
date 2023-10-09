import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("../../../components/News-Detail/"), {
  ssr: false,
});

const NewsDetail = async () => {
  return (
    <div>
      <NoSSR />
    </div>
  );
};

export default NewsDetail;
