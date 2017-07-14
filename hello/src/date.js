import React ,{ Component } from 'react'
// import Calendar from './calendar'
import './date.css'

export default class DateHeader extends Component{
   render(){
       return <div className="dateHeader">  
            <div className="date">
              <h1>{this.props.getDate.day}
              </h1>
              <div>
                 <h3>{this.props.getDate.month}</h3>
                <span>{this.props.getDate.year}</span>
              </div>
            </div>
            <svg viewBox="0 0 24 24" fill="rgba(52, 52, 52,.9)" height="3em" width="3em" className="calendar">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path>
            </svg>
            {/*<Calendar getDate={this.props.getDate.bind(this)}/>*/}
            <h2 className="week">
              {this.props.getDate.week}
            </h2>
          </div>
     
   }
 }

