//import preact
import {h, render, Component} from 'preact';

// import stylesheets for iphone & button
import style from './style';

export default class HomepageFuture extends Component{
	render (){
		let table =[];
		let row=[];
		//Inner loop to create children
		var icon_list = this.props.future_icon_list&&this.props.future_icon_list.map((item,index)=>{
			return item;
		});
		var setIcon = require("components/iphone/setIcon/index.js");
		return (
			<div id = {"below_area"}>
				<div  class ={style.timeline}>
					<div id ={"below_timeline_table"} class ={style.timeline_table}>
						<table>{this.timeline_table()}</table>
					</div>
				</div>
				
				<div id ={"below_future"} class ={style.futureContainer}>
					<div class ={style.future_table}>
						<div id ={style.vertical_line_1}></div>
						<div id ={style.vertical_line_2}></div>
						<div id ={style.horizontal_line_1}></div>
						<div id ={this.props.future_table_id} class ={style.future_box_container}>
							{	
								this.props.future_temp&&this.props.future_temp.map((obj, index) => {
								
								if(index<6){
									var day = new Date(Date.now()).getDay();
									var day_list = ["Monday", "Tuesday", "Wednesday", " Thursday", "Friday", "Saturday", "Sunday"];
									var day_index = day-1+index;
									if (day_index >6){day_index-=7}
									var today = day_list[day_index];
									if(index == 0){
										today = "Today";
									}
									return(
										<span id ={"future_day_"+(index+1)} class ={style.future_box} key={`${obj.min}`}>
										<p class = {style.future_temp}>{obj.min}/<span id = {style.future_temp_max}>{obj.max}</span></p>
										<img class ={style.future_icons} src = {setIcon.setUpIcons(icon_list[index])} alt="future icons" width= "50" height = "50" />
										<div>{today}</div>
										</span>
									);
								}
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
	timeline_table = () =>{
		let table = [];

		// Outer loop to create parent
		let time = [];
		let temp = [];
		var timediff = this.props.timediff;
		var time_each_hour = parseInt(new Date(Date.now()+ timediff).toLocaleTimeString().split(":")[0]);
		var temp_list = this.props.timeline_temp;
		
		var time_suffix = "am";

		for (var i =0; i<= 9;i++){
			if (time_each_hour>12){
				if(time_suffix == "am"){time_suffix="pm"}
				else time_suffix ="am";
				time_each_hour  = time_each_hour -12;
			}
			var value_to_push = time_each_hour+time_suffix;
			if(i==0){value_to_push ="Now"}
			time.push(
				<td id = { style.timeline_time }>{value_to_push}{"  "} </td>
			);
			time_each_hour += 3;
		}
		
		
		//Create the parent and add the children
		table.push(<tr>{time}</tr>);
		
		temp.push(temp_list&&temp_list.map((item, index) => {
			return (<td id = { style.timeline_temp } key={`${index}`}>{item}</td>);
		}));
		table.push(<tr>{temp}</tr>);
		//console.log(this.state.time_list);
		return table;

	}
	
}