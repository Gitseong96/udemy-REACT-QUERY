import { useEffect, useState } from "react";
import {useQuery ,useQueryClient} from "react-query"
import { PostDetail } from "./PostDetail";

const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const queryClient = useQueryClient()
// 다음 페이지를 미리 캐싱하는 작업
  useEffect(()=>{
    if(currentPage < maxPostPage){

      const nextPage = currentPage+1;
  queryClient.prefetchQuery(["posts",nextPage],()=>fetchPosts(nextPage),{
    staleTime : 2000,
    keepPreviousData :true, //캐시에 해당 데이터가 있도록 설정하는 값 
  })
  console.log(queryClient)
    }
  },[currentPage ,queryClient])

// const data = []
  // replace with useQuery
  const {data , isError , error,isLoading, isFetching} = useQuery(["posts",currentPage],
  ()=> {
    const data =  fetchPosts(currentPage);
    return data 
  }
  ,{staleTime:2000})
if(isLoading) return <h3>Loading....</h3>
if(isError )return <h3>Oops , somthing went wrong <p>{error.toString()}</p></h3>
console.log(data)
  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <=1} onClick={() => {setCurrentPage((previousValue)=>previousValue-1)}}>
          Previous page
        </button>
        <span>Page {currentPage }</span>
        <button disabled={currentPage >= maxPostPage}
         onClick={() => {setCurrentPage(currentPage+1)}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
