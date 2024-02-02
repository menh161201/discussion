import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { db } from "@/db"
import paths from "@/path";

export default async function TopicList() {
    const topics = await db.topic.findMany()

    return (
        <div className="flex flex-wrap gap-4 py-4">
          {topics.map((item) => (
            <Link href={paths.topicShow(item.slug)} key={item.id}>
                <Chip color="warning" variant="shadow">{item.slug}</Chip>
            </Link>
            
          ))}
        </div>
    )
}