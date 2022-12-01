/* eslint-disable array-callback-return */
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import {  useInfiniteQuery } from "react-query";
const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {data,fetchNextPage,hasNextPage,isLoading,isError,error} = useInfiniteQuery("SW-species",({pageParam=initialUrl})=>fetchUrl(pageParam)
  ,{
    getNextPageParam:(lastPage)=>lastPage.next ||undefined
  }
  )
  if(isLoading) return <div>Loading.....</div>
  return <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} >
    {data.pages.map((result)=>{
     return result.results.map((el)=>{
      return  <Species 
        key ={el.name}
        name ={el.name}
        language ={el.language}
        averageLifespan ={el.average_lifesapn}
        />
      })
    })}
  </InfiniteScroll>
}
