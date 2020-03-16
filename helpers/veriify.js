import { Component } from "react";
import nextCookies from 'next-cookies'

export default async(WrappedComponent, accessGroup) => {
    class Wrapper extends Component
    {
        render(){
            return(
                <WrappedComponent {...this.props} />
            )
        }
        
        static async getInitialProps(ctx){
            let {user_data} = nextCookies(ctx)
            const componentProps = WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx))
            return {...componentProps, user_data}
        }
    }
    return Wrapper
}