import React from 'react'
import Sidebar from '../navbar/sidebar'
import './layout.scss'
import TopNav from '../navbar/topnav'
import Main from '../main'
import Success from '../SuccessMessage'
import HandPointer from '../../assets/img/hand_one.png'
import  HandFold from '../../assets/img/hand_rock.png'
import  HandFirst from '../../assets/img/hand_first.png'


const Layout = () => {
  return (
    <div className="layout">
      <img className="hand-image" src={HandPointer} alt="" />
      <img className="hand-image" src={HandFold} alt="" />
      <img className="hand-image" src={HandFirst} alt="" />
        <Sidebar />
        <div className="main-content">
          <TopNav position="absolute" />
          {/* <Success/> */}
          <Main />
        </div>
        
    </div>
  )
}

export default Layout