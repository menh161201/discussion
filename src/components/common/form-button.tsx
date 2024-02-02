'use client';

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

interface FormButtonProp {
    children: React.ReactNode;
}
export default function FormButton({children}:FormButtonProp) {
    const {pending} = useFormStatus();

    return (
        <Button type="submit" isLoading={pending} color="danger">
            {children}
        </Button>
    )
}