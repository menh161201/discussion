
import { db } from "@/db"
import { Divider } from "@nextui-org/react"
import PostCreateForm from "@/components/posts/post-create-form"
import PostList from "@/components/posts/post-list"
import { fetchPostsByTopic } from "@/db/queries/posts"

interface TopicShowProps {
    params: {
        slug: string
    }
}

export default async function TopicShowPage(props:TopicShowProps) {
    const topic = await db.topic.findFirst({
        where: {
            slug: props.params.slug
        }
    })
    return (
        <div className="grid grid-cols-4 p-4 gap-4">
            <div className="col-span-3">
                <h1 className="text-xl m-2">{props.params.slug}</h1>
                <PostList fetchData={() => fetchPostsByTopic(props.params.slug)}/>
            </div>
            <div className="flex flex-col border rounded-lg p-4 shadow-md">
                <PostCreateForm slug={props.params.slug}/>
                <Divider className="my-2"/>
                {topic?.description}
            </div>
        </div>
    )
}