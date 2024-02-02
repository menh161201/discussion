import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/path";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import { Suspense } from "react";
import PostShowLoading from "@/components/posts/post-show-loading";

interface PostShowPageProps {
  params: {
    slug: string;
    postID: string;
  };
}

export default function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postID } = params;
  
  
  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid pl-4" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postID={postID}/>
      </Suspense>
      <CommentCreateForm postId={postID} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(postID)} />
    </div>
  );
}
