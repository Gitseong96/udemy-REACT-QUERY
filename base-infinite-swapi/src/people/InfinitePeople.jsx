/* eslint-disable array-callback-return */
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";
// import sttyle from 

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery("SW-people", ({ pageParam = initialUrl }) => fetchUrl(pageParam)
    , {
      getNextPageParam: (lastPage) => lastPage.next || undefined
    }
  )
  // fetchNextPage 더 많은 데이터가 필요할때 어느 함수를 실행할지 지시하는 함수
  // hasNextPage 수집할 데이터가 더 있는지 결정하는 불리언
  // TODO: get data for InfiniteScroll via React Query
  if (isLoading) return <div>Loading....</div>
  // if(isError) return <div>{error.toString()}</div>
  return (<>
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} >
      {data.pages.map((pageDat) => {
        pageDat.results.map((person) => {
          <Person
            key={person.name}
            name={person.name}
            hairColor={person.hair_color}
            eyeColor={person.eye_color} />
        })
      })}
    </InfiniteScroll>
  </>)
}
