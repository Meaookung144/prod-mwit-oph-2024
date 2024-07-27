import { createClient } from "../supabase/server"

const isValidDate = (date: Date) => (date.getDate() === 23 || date.getDate() === 24) && date.getMonth() === 7 && date.getFullYear() === 2024

export async function isUserInGroup({userId, date} : {userId: string, date: Date}) {
    if (!isValidDate(date)) return { data: null, error: new Error('Invalid date') }
    date.setHours(0, 0, 0, 0)
    const client = createClient()
    const { data, error } = await client
        .from('group_detail')
        .select('id')
        .eq('owner', userId)
        .eq('join_day', date.toISOString())
    return { data, error }
}

export async function getUserGroups({userId} : {userId: string}) {
    const client = createClient()
    const { data, error } = await client
        .from('group_detail')
        .select('*')
        .eq('owner', userId)
    // dont let the user see error
    if (error) console.error(error)
    return { data, error: error?.message }
}

export async function createGroup({ownerId, date} : {ownerId: string, date: Date}) {
    if (!isValidDate(date)) return { data: null, error: new Error('Invalid date') }
    const client = createClient()
    const { data, error } = await client
        .schema("guest_data")
        .from('groups')
        .insert([{owner: ownerId, date}])
    return { data, error }
}