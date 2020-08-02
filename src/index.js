import React from 'react'
import styles from './styles.module.css'
import { createRef } from 'react';

export default class DragInertia extends React.Component{

  constructor(props){
    super(props);
    this.state={clicked:false,posX:0,posY:0,difX:0,difY:0,boxWidth:0,boxHeight:0,lastMouseX:[],lastMouseY:[]};
    this.mouseDown= this.mouseDown.bind(this);
    this.moving = this.moving.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.inertia = this.inertia.bind(this);
    this.inertiaPower = this.props.inertiaPower;

    const dragObj= createRef(null);
  }

 componentDidMount(){


    window.addEventListener('mouseup',()=>{this.state.clicked? this.mouseDown: null;},false);



   let rect = this.dragObj.getBoundingClientRect();
   const rect_X = rect.left;
   const rect_Y = rect.top;
   const rect_width = rect.width;
   const rect_height = rect.height;
   this.setState({posX:rect_X,posY:rect_Y, boxWidth:rect_width, boxHeight:rect_height});
 }
 inertia(lastX,lastY){
   const xLength= this.state.lastMouseX.length;
   const yLength= this.state.lastMouseY.length;
   let lastDifX= this.state.lastMouseX[xLength-1]-this.state.lastMouseX[xLength-2];
   let lastDifY= this.state.lastMouseY[yLength-1]-this.state.lastMouseY[yLength-2];
   let divide= Math.round(Math.sqrt(Math.pow(lastDifX,2)+Math.pow(lastDifY,2)));
   let incX=-1*lastDifX/divide;
   let incY=-1*lastDifY/divide;
   if(isNaN(incX)){incX=-1;}
   if(isNaN(incY)){incX=-1;}


   if(lastDifX<0){
     incX*=-1;
   }
   if(lastDifY<0){
     incY*=-1;
   }
   let newX = this.state.posX +lastDifX;
   let newY = this.state.posY +lastDifY;

   let timer,timerInit;

   if(this.inertiaPower<6 && this.inertiaPower>0){
   timer =this.inertiaPower*5;
   timerInit=this.inertiaPower*5;
   }
   else{
    timer =5;
    timerInit=5;
   }


   let interval = setInterval(()=>{
     if(timer==0){clearInterval(interval);}

      if(isNaN(lastDifX) || isNaN(lastDifY)){clearInterval(interval);}
      timer--;
     lastDifX+=incX/((timerInit-timer)*2);
     lastDifY+=incY/((timerInit-timer)*2);
     newX+=lastDifX;
     newY+=lastDifY;


     this.setState({posX:newX, posY:newY});

   },25);



   this.setState({lastMouseX:[],lastMouseY:[]});
 }
 mouseUp(e){

 this.setState({clicked:false});
 if(this.state.lastMouseX.length>0 && this.state.lastMouseY.length>0){if(this.props.inertiaPower!==0){this.inertia(e.clientX,e.clientY);}}


 }
 mouseDown(e){

   const differenceX = e.clientX-this.state.posX;
   const differenceY = e.clientY- this.state.posY;
   this.setState({clicked:true,difX:differenceX,difY:differenceY});
   this.moving;

 }

 moving(e){



   const newX = e.clientX - this.state.difX;
   const newY = e.clientY - this.state.difY;


    const firstMouseX = e.clientX;
    const firstMouseY = e.clientY;
    let mouseArrayX =[];
    let mouseArrayY =[];
    mouseArrayX= this.state.lastMouseX;
    if(!isNaN(firstMouseX)){mouseArrayX.push(firstMouseX);}
    mouseArrayY= this.state.lastMouseY;
    if(!isNaN(firstMouseX)){mouseArrayY.push(firstMouseY);}
    this.setState({posX:newX, posY:newY,lastMouseX:mouseArrayX,lastMouseY:mouseArrayY});
    console.log(this.state.posX+ " and "+this.state.posY);

 }


   render(){

       return(

        <div ref={el=> this.dragObj =el} className={styles.box} style={{left:this.state.posX+`px`,top:this.state.posY+`px`,position:absolute,transition :all}} onMouseDown={this.mouseDown} onMouseOut={this.state.clicked ? this.moving:null} onMouseUp={this.mouseUp} onMouseMove={this.state.clicked ? this.moving:null}  > {this.props.children}</div>

      )
   }
}
