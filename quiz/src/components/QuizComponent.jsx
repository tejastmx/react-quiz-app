

import React, { Component } from 'react'

import {Link} from 'react-router-dom'
import axios from 'axios'
import ResultComponent from './ResultComponent'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default class QuizComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            index:0,
            datas:[]
        }
        console.log(props);
    }


    previousQuestion=()=>{
        this.disable()
        if(this.state.index>0)
            this.setState({index:this.state.index-1})
    }

    nextQuestion =()=>{
        this.enable()
        if(this.state.index<9)
        {
            this.setState({index: this.state.index + 1})
            setTimeout (this.hide,600)
        }
        else{
            alert("Quiz Completed press on exit button")
        }
    }
 
    hide = () => {
        let btn = document.getElementById('ans')
        btn.style.display = 'none'
    }
  
    chcekAns = (e)=>{
        let ans = e.target.value
        let btn = document.getElementById('ans')
        console.log(this.state.datas[this.state.index].answer +" " +ans)
        if (this.state.datas[this.state.index].answer===ans)
        {
           
            
            btn.innerText="Correct"
            btn.style.backgroundColor='green'
            btn.style.display="block"
            this.nextQuestion()
            this.setState({
                correct : this.state.correct+1
            })
            this.props.checkCorrect()
        }
        else
        {
            btn.innerText = "Wrong"
            btn.style.backgroundColor = 'red'
            btn.style.animation = 'hideIt 1s forwards'
            btn.style.display = "block"
            this.nextQuestion()
        }
    }
    //enable next qustions button
    enable =()=>{
        let btn = document.getElementById('options').querySelectorAll('.button')
        btn.forEach((val) => {
            val.disabled = false
        })
    }
    //disable previous question button
   disable = ()=>{
    let btn = document.getElementById('options').querySelectorAll('.button')
    btn.forEach((val)=>{
            val.disabled = true 
    })
   }
   componentDidMount(){
       axios.get('https://my-json-server.typicode.com/Naveen132895/quiz-api/questions').then((res)=>{
            this.setState({
                datas:res.data
            })
          
       })
   }
    render() {
        const isdata = this.state.datas.length
        const finaldata = this.state.datas[this.state.index]
        // console.log(this.state.correct);
            return (
               <>
                    
                    <div className="main-container">
                        {isdata > 0 ?
                        <div className="quiz-container">
                            <h1>Question</h1>
                            <div className="question-container">
                                <h4>{finaldata.id} of 10</h4>
                                    <h3>{finaldata.question}</h3>
                            </div>
                            <div className="options" id="options">
                                <button className="button" onClick={this.chcekAns} value={finaldata.options[0]}>{finaldata.options[0]}</button>
                                    <button className="button" onClick={this.chcekAns} value={finaldata.options[1]}>{finaldata.options[1]}</button>
                                <button className="button" onClick={this.chcekAns} value={finaldata.options[2]}>{finaldata.options[2]}</button>
                                <button className="button" onClick={this.chcekAns} value={finaldata.options[3]}>{finaldata.options[3]}</button>
                            </div>
                            <div className="buttons">
                                <button onClick={this.previousQuestion}>Previous</button>
                                <button onClick={ this.nextQuestion }>Next</button>
                                <button><Link to="/ResultComponent" className="link">Quit</Link></button>  
                            </div>
                            <div>
                                <button id="ans"></button>
                            </div>
                        </div>
                        :<div></div>}
                    </div>
                </>  
            );
          
    }
}
