import React from 'react'
import ReactDom from 'react-dom'
import Head from 'next/head'
import Navbar from './Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainJs from '@static/template/assets/js/app'
import '@static/template/assets/css/plugins.css'
import '@static/scss/style.scss'
import '@static/template/assets/js/libs/jquery-3.1.1.min.js'
import '@static/template/bootstrap/js/popper.min.js'
import '@static/template/plugins/perfect-scrollbar/perfect-scrollbar.min.js'
// import '@static/template/bootstrap/js/bootstrap.min.js'
import Wrapper from './Wrapper'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', url => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class Layout extends React.Component
{
  state = {
    isOpen: true
  }
  constructor(props) {
    super(props);
    
  }
  componentDidMount(){
    // NProgress.start()
    MainJs.init()
  }
  
    render() {
      return (
        <div>
            <Head>
              <meta charSet="utf-8"/>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
              <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
              <title>Spectrum</title>
              <meta name="author" content="SPE Solution"/>
              <meta name="description" content={"SPE Solusion "}/>
              <meta name="keyword" content="SPE"/>
              <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet"/>
              <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico"/>
              <script
                src="https://code.jquery.com/jquery-3.4.1.min.js"
                integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                crossOrigin="anonymous"></script>
            </Head>
            <Navbar/>
            <Wrapper>
              {this.props.children}
            </Wrapper>
        </div>
      );
    }
}

export default Layout