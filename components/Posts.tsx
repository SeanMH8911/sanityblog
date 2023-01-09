import Link from 'next/link';
import {sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post];
}
export default function Posts({posts}: Props) {
  return ( 
    <div>
      {posts.map(post => (
        <Link key={post._id} href={`/post/${post.slug.current}`}></Link>
      ))}
    </div>
  )
}
 


export const getServerSideProps = async () => {
const query = `*[_type == "post"]{
  _id,
    title,
    author->{
      name,
      image
    },
    description,
    mainImage,
    slug
}
`;

const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    }
  }
}