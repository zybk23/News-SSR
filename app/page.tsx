import Image from "next/image";

export default async function Home() {
  const arr: any = await fetch(
    "https://newsapi.org/v2/sources?apiKey=499efd9767c54b0cbf568d0e6ce37ae5"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
  console.log("taha zeyb", arr.sources);

  return (
    <div>
      {arr &&
        arr.sources.map((item: any) => <span key={item.id}>{item.name}</span>)}
    </div>
  );
}
