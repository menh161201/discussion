'use client';

import { useFormState } from "react-dom";
import {Popover, PopoverTrigger, PopoverContent,Button,Input,Textarea} from "@nextui-org/react";
import * as actions from '@/actions'
import { useSession } from "next-auth/react";
import FormButton from "../common/form-button";

interface PostCreateFormProps {
    slug: string
}

export default function PostCreateForm({slug}: PostCreateFormProps) {
    const [formState, action] = useFormState(actions.createPost.bind(null,slug), {errors : {}})

    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="success" variant="flat">Create a post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Post</h3>
                        <Input label='Title' name="title" isInvalid={!!formState.errors.title} errorMessage={formState.errors.title?.join(' ,')}/>
                        <Textarea label='Content' name="content" isInvalid={!!formState.errors.content} errorMessage={formState.errors.content?.join(' ,')}></Textarea>
                        <FormButton>Create</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}