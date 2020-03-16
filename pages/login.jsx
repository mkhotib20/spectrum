import {LoginLayout, Form} from '~/components'
import { Component } from 'react';
import {Persons} from '~/fetcher'
import Router from 'next/router';
import Cookies from 'js-cookie'

class Login extends Component
{
    login = (e, value)=>{
        console.log(value)
        console.log(Persons);
        
        let per = Persons.find(val => {
            return val.id==value.username && val.password==value.password
        })
        if (per) {
            Cookies.set('user_data', per)
            Router.push('/')
        }
    }
    render() {
        return (
            <LoginLayout>
                <div className="form-container outer">
                    <div className="form-form">
                        <div className="form-form-wrap">
                            <div className="form-container">
                                <div className="form-content">

                                    <h1 className="">Sign In</h1>
                                    <p className="">Log in to your account to continue.</p>
                                    <Form attributes={{
                                        username: '',
                                        password: ''
                                    }} types={{
                                        password: 'password'
                                    }} 
                                        onSubmit={this.login}
                                    />
                                </div>                    
                            </div>
                        </div>
                    </div>
                </div>
            </LoginLayout>
        )
    }
}

export default Login