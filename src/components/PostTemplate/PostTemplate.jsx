

export default function PostTemplate(props){
  console.log(props.excerpt)
  return(
    <>
    <h1>{props.title}</h1>
    <div>
    <p>{props.excerpt}</p>
    </div>
    </>
  )
}