import TopicCreateForm from "@/components/topics/topic-create-form"
import TopicList from "@/components/topics/topic-list"
import { Divider } from "@nextui-org/react"
import TipTap from "@/components/tiptap"
import PostList from "@/components/posts/post-list"
import { fetchTopPost } from "@/db/queries/posts"

export default async function Home() {

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Post</h1>
        <PostList fetchData={() => fetchTopPost()}/>
        {/* <TipTap /> */}
      </div>
      <div className="border p-4 shadow-md rounded-lg flex flex-col">
        <TopicCreateForm />
        <Divider className="mt-4 shadow-md"/>
        <TopicList />
      </div>
    </div>
  )
}
