import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import { getUserGroups, isUserInGroup } from "../../../lib/data/group";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const session = await auth();
    if (!session || !session.user?.id) return NextResponse.json(session, { status: 401 });
    const userGroupData = await getUserGroups({ userId: session.user.id });
    if (userGroupData.error) return NextResponse.json(userGroupData.error, { status: 500 });
    return NextResponse.json({
        data: userGroupData.data,
        registered: userGroupData.data?.length ?? 0 > 0
    });
}