"use server";

import { DefaultSession } from "next-auth";
import { auth } from "../../auth";
import { createClient } from "../supabase/server";

export type Province = "กรุงเทพมหานคร" | "สมุทรปราการ" | "นนทบุรี" | "ปทุมธานี" | "สมุทรสาคร" | "พระนครศรีอยุธยา" | 
"อ่างทอง" | "ลพบุรี" | "สิงห์บุรี" | "ชัยนาท" | "สระบุรี" | "ชลบุรี" | "ระยอง" | "จันทบุรี" | 
"ตราด" | "ฉะเชิงเทรา" | "ปราจีนบุรี" | "นครนายก" | "สระแก้ว" | "นครราชสีมา" | "บุรีรัมย์" | 
"สุรินทร์" | "ศรีสะเกษ" | "อุบลราชธานี" | "ยโสธร" | "ชัยภูมิ" | "อำนาจเจริญ" | "บึงกาฬ" | 
"หนองบัวลำภู" | "ขอนแก่น" | "อุดรธานี" | "เลย" | "หนองคาย" | "มหาสารคาม" | "ร้อยเอ็ด" | 
"กาฬสินธุ์" | "สกลนคร" | "นครพนม" | "มุกดาหาร" | "เชียงใหม่" | "ลำพูน" | "ลำปาง" | 
"อุตรดิตถ์" | "แพร่" | "น่าน" | "พะเยา" | "เชียงราย" | "แม่ฮ่องสอน" | "นครสวรรค์" | 
"อุทัยธานี" | "กำแพงเพชร" | "ตาก" | "สุโขทัย" | "พิษณุโลก" | "พิจิตร" | "เพชรบูรณ์" | 
"ราชบุรี" | "กาญจนบุรี" | "สุพรรณบุรี" | "นครปฐม" | "สมุทรสงคราม" | "เพชรบุรี" | 
"ประจวบคีรีขันธ์" | "ชุมพร" | "ระนอง" | "สุราษฎร์ธานี" | "พังงา" | "ภูเก็ต" | "กระบี่" | 
"นครศรีธรรมราช" | "ตรัง" | "พัทลุง" | "สตูล" | "สงขลา" | "ปัตตานี" | "ยะลา" | "นราธิวาส"

interface UserInfo {
    user: {
        prefix: 'นาย' | 'นาง' | 'นางสาว',
        age: number,
        telephone: string,
        province: Province,
        role: string
    } & DefaultSession["user"]
}

export async function updateInfoAsync(info: UserInfo) {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');
    const supabase = createClient();
    const newData = {
        prefix: info.user.prefix,
        age: info.user.age,
        telephone: info.user.telephone,
        province: info.user.province,
        name: info.user.name,
        role: info.user.role
    }
    const data = await supabase.schema("next_auth").from('users').update(newData).eq('id', session.user.id);
    if (data.status === 200) {
        return true;
    } else {
        console.error(data.error);
        return false;
    }
}