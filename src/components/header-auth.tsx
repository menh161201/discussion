'use client';

import { NavbarItem,Button,Avatar,Popover,PopoverTrigger,PopoverContent } from "@nextui-org/react";
import * as action from '@/actions/index'
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
    const session = useSession();
    let authContent: React.ReactNode;
    if (session.status === 'loading') {
        authContent = null;
    } else if (session.data?.user) {
        authContent = <Popover placement="bottom">
                        <PopoverTrigger>
                            <Avatar src={session.data.user.image || ''}/>
                        </PopoverTrigger>
                        <PopoverContent className="py-2">
                            <form action={action.signOut}>
                                    <Button type="submit" color="danger" variant="flat">Sign Out</Button>
                            </form>
                        </PopoverContent>
                    </Popover> 
        
    }else {
        authContent = <>
            <NavbarItem>
                <form action={action.signIn}>
                    <Button type="submit" color="success" variant="flat">Sign In</Button>
                </form>
            </NavbarItem>
        </>
    }

    return authContent
}