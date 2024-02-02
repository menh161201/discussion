'use server';
import { z } from "zod";
import { redirect } from "next/navigation";
import type {Topic} from '@prisma/client';
import { db } from "@/db";
import paths from "@/path";
import { revalidatePath } from "next/cache";


const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, {message: 'Must be lowercase letter or dashes without spaces'}),
    description: z.string().min(10)
})

interface createTopicFormState {
    errors: {
        name?: string[],
        description?: string[],
        _form?: string[]
    }
}

export async function createTopic(formState: createTopicFormState, formData: FormData) : Promise<createTopicFormState> {


    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    })
    
    if (!result.success) {
    
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let topic: Topic;
    
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
            }
        })
    }catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong']
                }
            }
        }
    }
    revalidatePath('/')
    redirect(paths.topicShow(topic.slug))
    
    return {
        errors: {
        }
    }
}