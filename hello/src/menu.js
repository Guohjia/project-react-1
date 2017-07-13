import React, { Component } from 'react';
import './menu.css'
export default class Menu extends Component {
    render() {
        const divStyle = {
            width: '3em',
            height: '3em',
            cursor: 'pointer'
        };
        return (
            <div className="menu">
                <svg className="sc-bxivhb eDCxFX" viewBox="0 0 24 24" style={divStyle} onClick={this.ItemApper.bind(this)}
                >
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                </svg>
                <div className="menuItem" style={{left:'-100%'}}>
                    <ul>
                        <li>
                            <svg className="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ccc" d="M512 582c-69.2 0-134.2-26.9-183.1-75.9C279.9 457.2 253 392.2 253 323c0-69.2 26.9-134.2 75.9-183.1C377.8 90.9 442.8 64 512 64s134.2 26.9 183.1 75.9S771 253.8 771 323c0 69.2-26.9 134.2-75.9 183.1S581.2 582 512 582zM512 128c-107.5 0-195 87.5-195 195 0 107.5 87.5 195 195 195s195-87.5 195-195C707 215.5 619.5 128 512 128zM829 670.5c-40.9-41-88.5-73.2-141.5-95.7-16.1-6.8-35 0.2-42.2 16.1-7.4 16.4 0.2 35.6 16.7 42.6 45.6 19.3 86.5 46.9 121.7 82.2 35.2 35.2 62.8 76.3 82.1 122 12.6 29.9 21.3 61 26 93 2.3 15.7 15.8 27.3 31.6 27.3l0 0c19.5 0 34.5-17.2 31.7-36.5-5.5-37.3-15.6-73.7-30.4-108.7C902.2 759.5 870 711.6 829 670.5zM160.1 837.7c19.3-45.7 46.9-86.8 82.1-122 35.1-35.2 75.9-62.8 121.3-82.1 16.3-6.9 24.3-26.3 17.2-42.5-7-16-25.6-23.4-41.8-16.6-53.2 22.5-101 54.8-142.1 96-41 41.1-73.2 89-95.7 142.3-14.8 35-24.9 71.3-30.4 108.7-2.8 19.3 12.2 36.5 31.7 36.5l0 0c15.8 0 29.3-11.6 31.6-27.3C138.8 898.7 147.4 867.6 160.1 837.7z" /></svg>
                        </li>
                        <li>
                        </li>
                        <li></li>
                    </ul>
                </div>
            </div>
        )
    }
  ItemApper(){
        let menuItem=document.querySelector('.menuItem')
        menuItem.style.left==='-100%'?menuItem.style.left='3%':menuItem.style.left='-100%'
    }
}