import { useQuery ,useMutation} from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // // replace with useQuery
  // console.log(post.id)
  // console.log(post)
  const {data ,isLoading,error ,isError} = useQuery(["comment",post.id],async()=>{
    const data = await fetchComments(post.id)
    return data
  })
const deleteMuataion = useMutation((postId)=>deletePost(postId))
const patchMuataion = useMutation((postId)=>updatePost(postId))

if(isLoading)return <div>Loading....</div>
if (isError)return <div>{error.toString()}</div>  
return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={()=>deleteMuataion.mutate(post.id)}>Delete</button>
      <button onClick={()=>patchMuataion.mutate(post.id)} >Update title</button>
      {deleteMuataion.isError && <p style={{color:"red"}} >error</p>}
      {deleteMuataion.isLoading && <p style={{color:"blue"}} > Loading....</p>}
      {deleteMuataion.isSuccess && <p style={{color:"green"}} > Succ....</p>}
      {patchMuataion.isError && <p style={{color:"red"}} >error</p>}
      {patchMuataion.isLoading && <p style={{color:"blue"}} > Loading....</p>}
      {patchMuataion.isSuccess && <p style={{color:"green"}} > Succ....</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
