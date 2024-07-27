import Link from 'next/link'
import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, Key } from 'react'
import { UrlObject } from 'url'

interface FooterLinkProps {
  footerLink: {
    name: string
    href: string
    nt: boolean
  }[],
  className?: string
}

export default function FooterLink({ footerLink, className, ...props }: FooterLinkProps) {
  return (
    <div {...props} className={className}>
      {footerLink.map(
        (f: { nt: any; href: string | UrlObject; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined }, i: Key | null | undefined) =>
          f.nt ? (
            <Link legacyBehavior href={f.href} key={i}>
              <a
                className='hover:scale-105 hover:text-gray-200 transition-all duration-200 whitespace-nowrap'
                target='_blank'
                rel='noopener noreferrer'
              >
                {/* <FontAwesomeIcon icon={faChevronRight} /> */}
                {f.name}
              </a>
            </Link>
          ) : (
            <Link legacyBehavior href={f.href} key={i}>
              <a className='hover:scale-105 hover:text-gray-200 transition-all duration-200 whitespace-nowrap'>
                {/* <FontAwesomeIcon icon={faChevronRight} /> */}
                {f.name}
              </a>
            </Link>
          ),
        // <div className='text-white' key={i}>
        //   {f.name}
        // </div>
      )}
    </div>
  )
}
