import Link from 'next/link'

const CustomLink = (props) => {
    return(
        <Link as={props.as} href={props.href}>
            <a {...props}>
                {props.children}
            </a>
        </Link>
    )
}

export default CustomLink