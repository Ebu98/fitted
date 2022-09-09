import React from 'react'
import Sidebar from '../navbar/sidebar'
import HandPointer from '../../assets/img/hand_one.png'
import  HandFold from '../../assets/img/hand_rock.png'
import './layout.scss'
import TopNav from '../navbar/topnav'
import Main from '../main'

const Layout = () => {
  return (
    <div className="layout">
        <Sidebar />
        <div className="main-content">
          <TopNav />
          <Main />
        </div>
        <div>
          {/* <HandPointer/> */}
          {/* <HandFold/> */}
        </div>
    </div>
  )
}

export default Layout