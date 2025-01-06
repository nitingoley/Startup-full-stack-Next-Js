import SearchForm from "@/components/SerachForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
// import {client} from '../../sanity/lib/client'
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { log } from "console";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query; 
  // const post = [{
  //   _createdAt: new Date(),
  //   views: 55,
  //   author: {_id: 1 , name: "Nitin Goley"},
  //   _id: 1,
  //   description: 'This is a description',
  //   image: 'https://images.pexels.com/photos/29615941/pexels-photo-29615941/free-photo-of-silhouettes-walking-along-a-historic-wall-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  //   category: 'xxcxcsdsd',
  //   title: 'hjdadja'
  // }];


  // STARTUPS_QUERY

  const params = {search: query || null};   


  const session = await auth();
  console.log(session?.id);
  const {data: post} = await sanityFetch({ query: STARTUPS_QUERY , params });



  // const post = await client.fetch(STARTUPS_QUERY);
    // console.log(JSON.stringify(post, null, 2));

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          for your grow or connect startup
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : `All Startups`}
        </p> 

        <ul className="mt-7 card_grid"> 
            {post.length > 0  ? (
              post.map((post: StartupCardType)=>(
                <StartupCard key={post?._id} post= {post} />
              ))
            ): (
              <p className="no-results">No startsup found !</p>
            )}
        </ul>
      </section> 

      <SanityLive />
    </>
  );
}
