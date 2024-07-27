"use server";

import { DefaultSession } from "next-auth";
import { auth } from "../../auth";
import { prisma } from "../database/manager";
import { prefix, province } from "@prisma/client";
import { toInteger } from "lodash";

interface UserInfo {
    user: {
        prefix: prefix,
        age: number,
        telephone: string,
        province: province,
        role: string
    } & DefaultSession["user"]
}

export async function updateInfoAsync(info: UserInfo) {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');
    const dbUpdate = await prisma.users.update({
        where: {
            id: session.user.id
        },
        data: {
            prefix: info.user.prefix,
            age: toInteger(info.user.age),
            telphone: info.user.telephone,
            province: info.user.province,
            visiting_status: info.user.role
        },
        select: {
            id: true
        }
    });
    console.log("Updated user info for user ID", dbUpdate.id);
    return dbUpdate;
}