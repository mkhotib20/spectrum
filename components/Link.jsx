import Link from 'next/link'

const CustomLink = (props) => {
    let {href, as,...newProps} = props
    return(
        <Link as={props.as} href={props.href}>
            <a {...newProps}>
                {props.children}
            </a>
        </Link>
    )
}

export default CustomLink