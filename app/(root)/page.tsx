import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCards, { StartupTypeCard } from "@/components/StartupCards";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home( {searchParams}: {searchParams: Promise<{query: string}>} ) 
{

  const query = (await searchParams).query;
  const params = { search: query || null };
  
  //const posts = await client.fetch(STARTUPS_QUERY) ;
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY , params}); 

  const session = await auth();
  console.log("session by radha", session?.id);



  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1 , name: "Aman kumar" },
  //     _id: 1,
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhwW6PbwRrHnDSnz1Iu0APlXH8XuJrODaPQw&s",
  //     category: "coding",
  //     title: "Robot",
  //     description: "Robots are programmable machines designed to perform tasks autonomously or with guidance."
  //   }
  // ]

  return (
    <>
      <section className="pink_container pattern">

        <div className="heading">pitch your startup, <br /> connect with entrepreneurs</div>
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
        <SearchForm query={query}/>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">{query ? `search results for "${query}"` : "All Startups"}</p>

        <ul className="mt-7 card_grid">
          {
            posts.length > 0 
            ?
            (
              posts.map((post: StartupTypeCard) => (<StartupCards key={post?._id} post={post}/>))
            )
            :
            <p className="no_results">No startups found</p>
          }
        </ul>

      </section>

      <SanityLive />
    </>
  );
}
