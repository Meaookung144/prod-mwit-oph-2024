"use client";

import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { Key } from 'react'
import { useParams } from 'next/navigation'

export default function CurrBlog() {
  return (
    <>
      <title>เงื่อนไขการลงทะเบียนและการเข้าร่วมงาน | MWIT Open House 2024</title>
      <meta name='description' content='หลักสูตร คำอธิบายรายวิชา และลักษณะการเรียนการสอนแต่ละสาขาของโรงเรียนมหิดลวิทยานุสรณ์ | MWIT Open House 2024' />
      <main className='w-full bg-gray-300/30 pt-8 md:pt-12 px-4'>
        {/* <div className='flex flex-col text-black gap-6 items-center mx-auto justify-self-center w-full max-w-6xl px-8 pt-10 pb-4'>
          <span className='font-CS font-bold text-3xl md:text-4xl lg:text-5xl'>
            {currContent.name}
          </span>
        </div> */}
        <div className='flex flex-wrap relative rounded-t-3xl overflow-hidden max-w-4xl mx-auto pb-3'>
          
        </div>

        <div className='flex flex-wrap relative rounded-t-3xl shadow-xl overflow-hidden bg-white max-w-4xl mx-auto justify-center pb-6'>
            <div className='flex flex-col px-6 py-4 w-full gap-3'>
                <span className='font-CS font-bold text-3xl md:text-4xl text-bmw text-center self-center'>
                Terms of Service | เงื่อนไขการให้บริการ
                </span>
                <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed indent-8'></span>
                <div className='flex flex-col gap-1'>
                    <div className='flex gap-1 font-IBMPlex font-semibold text-xl md:text-2xl text-phd' >
                        <span>1.นิยาม และ คำจำกัดความ</span>
                    </div>
                    <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed pl-8 '>
                        <b>&quot;โรงเรียน&quot;</b> หมายถึง โรงเรียนมหิดลวิทยานุสรณ์ 364 หมู่ 5 ต.ศาลายา อ.พุทธมณฑล จ.นครปฐม 73170<br />
                        <b>&quot;กน.&quot;</b> หมายถึง คณะกรรมการสภานักเรียนโรงเรียนมหิดลวิทยานุสรณ์<br />
                        <b>&quot;คณะจัดงาน&quot;</b> หมายถึง คณะทีมงานจัดงานในครั้งนี้<br />
                        <b>&quot;ข้อมูลส่วนบุคคล&quot;</b> หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อม แต่ไม่รวมถึงข้อมูลของผู้ถึงแก่กรรมโดยเฉพาะ<br />
                        <b>&quot;งาน&quot;</b> หมายถึง งาน MWIT Science Fetival & Open House 2024 ของโรงเรียนมหิดลวิทยานุสรณ์<br />
                        <b>&quot;เว็บไซต์&quot;</b> หมายถึง เว็บไซต์ openhouse.mwit.ac.th<br />
                        <b>&quot;บัญชี&quot;</b> หมายถึง บัญชีผู้ใช้งานเว็บไซต์<br />
                        <b>&quot;คุกกี้&quot;</b> หมายถึง ไฟล์เล็กๆที่ทำหน้าที่ยืนยันคุณลักษณะเฉพาะตัว<br />
                        <b>&quot;ผู้เข้าร่วมกิจกรรม&quot;</b> หมายถึง ผู้ที่เข้าร่วมกิจกรรมงาน MWIT Science Fetival & Open House 2024 ของโรงเรียนมหิดลวิทยานุสรณ์<br />
                        <b>&quot;ผู้ใช้งานเว็บไซต์&quot;</b> หมายถึง ผู้ที่ใช้งานเว็บไซต์ openhouse.mwit.ac.th หรือ square.mwit.ac.th หรือ ระบบลงทะเบียนที่เกี่ยวข้องกับงาน<br />
                        
                        </span>
                        <div className='flex gap-1 font-IBMPlex font-semibold text-xl md:text-2xl text-phd' >
                        <span>2.เงื่อนไขการเข้าใช้งานเว็บไซต์ และการเข้าร่วมงาน</span>
                    </div>
                    <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed ml-8'><b>2.1 การลงทะเบียน</b><br />
                        <span className="ml-16">2.1.1 ผู้เข้าใช้งานต้องลงทะเบียนผ่านระบบออนไลน์ตามที่คณะจัดงานกำหนด<br /></span>
                        <span className="ml-16">2.1.2 ผู้เข้าใช้งานต้องกรอกข้อมูลส่วนตัวให้ครบถ้วนและถูกต้อง โดยเฉพาะข้อมูลที่เกี่ยวข้องกับการติดต่อ<br /></span>
                        <span className="ml-16">2.1.3 ผู้เข้าใช้งานต้องยอมรับเงื่อนไขการให้บริการนี้ และยินยอมให้ข้อมูลส่วนบุคคลของตนเป็นไปตามที่กน. กำหนด<br /></span>
                    </span>
                    <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed ml-8'><b>2.2 สิทธิและหน้าที่ของผู้ลงทะเบียน</b><br />
                        <span className="ml-16">2.2.1 ผู้ลงทะเบียนมีสิทธิ์เข้าร่วมกิจกรรมทั้งหมดที่จัดขึ้นภายในงาน<br /></span>
                        <span className="ml-16">2.2.2 ผู้ลงทะเบียนต้องปฏิบัติตามกฎและระเบียบของโรงเรียนและผู้จัดงานอย่างเคร่งครัด<br /></span>
                    </span>
                    <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed ml-8'><b>2.3 การรักษาข้อมูลส่วนบุคคล</b><br />
                        <span className="ml-16">2.3.1 ข้อมูลส่วนบุคคลของผู้ลงทะเบียนจะถูกเก็บรักษาและใช้งานตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล<br /></span>
                        <span className="ml-16">2.2.2 ผู้ใช้งานและผู้เข้าร่วมงานยินยอมใน<a className='text-underline text-blue-500' href="https://www.mwit.ac.th/html/mwitDoc/PDPA/PA01.pdf">นโยบายคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy)</a> และ <a className='text-underline text-blue-500' href="https://www.mwit.ac.th/html/mwitDoc/PDPA/PA02.pdf">นโยบายความเป็นส่วนตัว (Privacy Notice)</a> และ <a className='text-underline text-blue-500' href="https://www.mwit.ac.th/html/mwitDoc/PDPA/PA03.pdf">นโยบายคุกกี้ (Cookie Policy)</a><br /></span>
                    </span>
                    <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed ml-8'><b>2.4 การเปลี่ยนแปลงเงื่อนไข</b><br />
                        <span className="ml-16">กน. อาจเปลี่ยนแปลงแก้ไขข้อเงื่อนไขการใช้งานนี้ได้ตลอดเวลา ตามที่ กน. เห็นสมควร โดยจะแจ้งเนื้อหาของเงื่อนไขการใช้งานรวมถึงวันที่มีผลบังคับใช้บนเว็บไซต์ หรืออาจแจ้งให้ทราบด้วยวิธีการอื่น ๆ ตามที่ กน. กำหนด เงื่อนไขการใช้งานฉบับแก้ไขจะมีผลบังคับใช้ตามวันที่กำหนดต่อไป</span>
                    </span>
                    <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed ml-8'><b>2.5 การใช้งานบัญชี</b><br />
                        <span className="ml-16">เมื่อใช้งาน ผู้ใช้งานจำเป็นต้องสมัครบัญชี โดยการลงทะเบียนด้วยข้อมูลที่เป็นความจริง ถูกต้อง ครบถ้วน กน. สงวนสิทธิ์ในการลบบัญชีใด ๆ ซึ่งเจ้าของบัญชีได้กระทำการที่ขัดต่อเงื่อนไขการใช้งานนี้โดยไม่ต้องบอกกล่าวล่วงหน้า บัญชีแต่ละบัญชีในการใช้งานเว็บไซต์นั้นมีไว้เพื่อการใช้งานเฉพาะบุคคล และผู้ใช้เป็นเจ้าของบัญชีนั้นแต่เพียงผู้เดียว ผู้ใช้ไม่สามารถโอน ให้ยืม จำหน่าย หรือเปลี่ยนแปลงบัญชีได้</span>
                    </span>
                    <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed ml-8'><b>2.6 ข้อห้ามและการระงับการใช้งาน</b><br />
                        <span className="ml-16">ผู้ใช้ไม่สามารถกระทำการดังต่อไปนี้เมื่อใช้งานเว็บไซต์:<br /></span>
                        <span className="ml-16">2.6.1 การกระทำที่ฝ่าฝืนกฎหมายหรือข้อบังคับใด ๆ<br /></span>
                        <span className="ml-16">2.6.2 การละเมิดสิทธิ์ในทรัพย์สินทางปัญญา<br /></span>
                        <span className="ml-16">2.6.3 การเผยแพร่เนื้อหาที่เป็นอันตราย หรือไม่เหมาะสมในทุกกรณี                        <br /></span>
                        <span className="ml-16">กน. สงวนสิทธิ์ในการระงับการใช้งานทั้งหมดหรือบางส่วน ลบบัญชี หรือยกเลิกข้อตกลงใด ๆ เกี่ยวกับการให้บริการระหว่างผู้ใช้และ กน. หากพบว่าผู้ใช้กระทำการที่ขัดต่อเงื่อนไขการใช้งานนี้</span>
                    </span>
                    <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed ml-8'><b>2.7 ความรับผิดชอบ</b><br />
                        <span className="ml-16">ผู้ใช้ต้องรับผิดชอบต่อการกระทำของตนเองในการใช้งานเว็บไซต์ กน. จะไม่รับผิดชอบต่อความเสียหายที่เกิดขึ้นจากการใช้งาน เว้นแต่ความเสียหายดังกล่าวเกิดจากการกระทำโดยเจตนาหรือโดยประมาทของ กน.</span>
                    </span>
                    <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed ml-8'><b>2.8 การใช้งานบัญชี</b><br />
                        <span className="ml-16">เมื่อใช้งาน ผู้ใช้งานจำเป็นต้องสมัครบัญชี โดยการลงทะเบียนด้วยข้อมูลที่เป็นความจริง ถูกต้อง ครบถ้วน กน. สงวนสิทธิ์ในการลบบัญชีใด ๆ ซึ่งเจ้าของบัญชีได้กระทำการที่ขัดต่อเงื่อนไขการใช้งานนี้โดยไม่ต้องบอกกล่าวล่วงหน้า บัญชีแต่ละบัญชีในการใช้งานเว็บไซต์นั้นมีไว้เพื่อการใช้งานเฉพาะบุคคล และผู้ใช้เป็นเจ้าของบัญชีนั้นแต่เพียงผู้เดียว ผู้ใช้ไม่สามารถโอน ให้ยืม จำหน่าย หรือเปลี่ยนแปลงบัญชีได้</span>
                    </span>
                    <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed ml-8'><b>2.9 การบันทึกภาพ และ ภาพเคลื่อนไหว</b><br />
                        <span className="ml-16">ผู้เข้าร่วมงาน ยินยอมให้คณะผู้จัดงาน โรงเรียนมหิดลวิทยานุสรณ์ คณะกรรมการสภานักเรียนโรงเรียนมหิดลวิทยานุสรณ์ และผู้ที่มีส่วนเกี่ยวข้องในการจัดงาน ในการบันทึกภาพ และ ภาพเคลื่อนไหว และยินยอมให้จัดเก็บ ประมวลภาพ และเพรยแพร่ภาพสู่สาธารณะ ผ่านทางช่องทางต่างๆ โดยจะไม่ขอเรียกร้องความเสียหายใดๆที่อาจเกิดขึ้น</span>
                    </span>
                    <span className='font-IBMPlexLoop text-sm md:text-base leading-relaxed md:leading-relaxed indent-8'>
                    </span>
                </div>
            </div>
        </div>
      </main>
    </>
  )
}