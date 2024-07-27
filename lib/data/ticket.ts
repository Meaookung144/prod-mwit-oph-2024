"use server";

export interface TicketCreateInfo {
    followers: {
        prefix: string | undefined;
        givenName: string | undefined;
        familyName: string | undefined;
        role: string | undefined;
        phone: string | undefined;
        age: number | undefined;
        school: string | undefined;
    }[];
    expect: string;
    travel: string;
    travelOther: string | undefined;
    joinDate: string;
    howDidYouKnow: string[];
}

// function that check if followers info are duplicated
function checkDuplicateFollowers(followers: TicketCreateInfo['followers']) {
    for (let i = 0; i < followers.length; i++) {
        for (let j = i + 1; j < followers.length; j++) {
            if (followers[i].phone === followers[j].phone) return true;
            if (followers[i].givenName === followers[j].givenName && followers[i].familyName === followers[j].familyName) return true;
        }
    }
    return false;
}

export async function createNewTicket(ticket: TicketCreateInfo) {
    if (ticket.followers.some(f => !f.givenName || !f.familyName || !f.role || !f.phone || !f.age || !f.school)) throw new Error('ผู้ติดตามต้องกรอกข้อมูลให้ครบถ้วน');
    if (ticket.joinDate !== '23' && ticket.joinDate !== '24') throw new Error('วันที่เข้าร่วมงานไม่ถูกต้อง');
    if (checkDuplicateFollowers(ticket.followers)) throw new Error('ข้อมูลผู้ติดตามซ้ำกัน');
    // now let's create a ticket
}