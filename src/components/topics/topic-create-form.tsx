'use client'
import { useFormState } from "react-dom";
import {Popover, PopoverTrigger, PopoverContent,Button,Input,Textarea} from "@nextui-org/react";
import * as actions from '@/actions'
import { useSession } from "next-auth/react";
import FormButton from "../common/form-button";

export default function TopicCreateForm() {
    const [formState, action] = useFormState(actions.createTopic, {errors: {}})
    const session = useSession();
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="success" variant="flat">Create a topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        {session.data?.user ?
                        <>
                            <h3 className="text-lg">Create a Topic</h3>
                            <Input label='Name' labelPlacement="inside"  name="name" isInvalid={!!formState.errors.name} errorMessage={formState.errors.name?.join(' ,')}/>
                            
                            <Textarea label='Description' labelPlacement="inside" name="description" isInvalid={!!formState.errors.description} errorMessage={formState.errors.description?.join(' ,')}/>
                            {formState.errors._form? <div>{formState.errors._form}</div> : null }
                            <FormButton>Submit</FormButton>
                        </>
                        :
                        <div className="text-center">
                            You Must Signed In To Do This
                        </div>
                        }
                        
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}