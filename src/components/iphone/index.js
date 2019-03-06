// import preact
import { h, render, Component } from 'preact';

// import stylesheets for iphone & button
import style from './style';


// import jquery for API calls
import $ from 'jquery';
import {slider} from 'jquery-ui';

// import the class components

import Mainframe from '../city_page/main_frame';
import Message from "./Message.js";
import HomepageMenu from './menu';
import HomepageCurrent from './current';
import HomepageFuture  from './future';
import MusicRecommendation  from './musicRecommendation';
export default class Iphone extends Component {
	// a constructor with initial set states
	constructor(props){
		super(props);
		this.setState({
			//simulate a GPS location, this set the default current loaction is always London
			gps_locate: "London",
			//default main (curent) temperature 
			temp: "",
			//default weather condition
			cond: "",
			//default location
			locate: "London",
			//default page display
			display: true,
			//default below area display
			showBelow: true,
			//default input city
			city: 'London',
			//default page pointer
			onHomepage: true,
			//default geographical location
			city_geo: [51.509865, -0.118092],
			bg: "",
			timediff: 0,
			currentTime_h: ""
		});
		// end of the initialization

		//loading the localstorage
		if(localStorage.getItem("homepage_city") != null && localStorage.getItem("homepage_lon") != null && localStorage.getItem("homepage_lat") != null){
			this.setState({
				locate: localStorage.getItem("homepage_city"),
				city_geo: [localStorage.getItem("homepage_lon"), localStorage.getItem("homepage_lat")],
				city: localStorage.getItem("homepage_city")
			});
		}
		else{
			localStorage.setItem("homepage_city", this.state.locate);
			localStorage.setItem("homepage_lon", this.state.city_geo[0]);
			localStorage.setItem("homepage_lat", this.state.city_geo[1]);
		}
	}
	
	//fetch weather data once and generate the weather of future days
	componentDidMount =() =>{
		this.fetchWeatherData();
		if (localStorage.getItem("version") == null || localStorage.getItem("version") < "1.4"){
			setTimeout(
				function() {
					alert("New version updated (04/Mar/2019) Now: version 1.4.\n"+
					"Previous updates:\n"+
					"#v1.2\n\t"+
					"This version fixed the bugs that are included \"not holding the cities saved\", etc.\n\n"+
					"#v1.3\n\t-significant performance optimizations.\n"+
					"\t-more musics joined in the library.\n"+
					"\t-world clocks are supported for each city.\n\n"+
					"#v1.4\n\tAnimated icon added\n\t"+
					+"more bacground image added.");
				}
				.bind(this),
				3000
			);
			localStorage.setItem("version","1.4");
			localStorage.removeItem("city_history");
		}
	}
	//}
	//connect with a local api to check if the city is existing in the database
	checkCity= () =>{
		$.ajax({
			url: "https://raw.githubusercontent.com/YZ6565785/world_city_list/master/city.list.json",
			dataType: "json",
			success : this.getData_city,
			error : function(req, err){ 
				console.log('city not found ' + err); 
			}
		});
	}
	
	// fetch city information through a json file
	// update the geographical location and the city
	getData_city = (parse_json) =>{
		// set not found as default
		var result = false;
		for (var i =0; i<parse_json.length;i++){
			if (parse_json[i]["name"] == this.state.city){
				var geo = [ parse_json[i]["coord"]["lon"], parse_json[i]["coord"]["lat"] ];
				this.setState({city_geo: geo});
				//console.log('city_geo: ' + this.state.city_geo);
				result = true;
				break;
			}
		}
		// if the city is found call the api to fetch weather
		if(result){
			this.fetchWeatherData();
			this.back_to_home();
		}
		else{
			alert("Cannot find this city: "+ this.state.city);
		}
		this.setState({city: this.state.locate});
		return result;
	}
	// fetch the weather data from openweathermap api
	fetchWeatherData = () => {
		this.fetchTimediff();
		var cityId = this.state.locate;
		var geo = this.state.city_geo;
		//var link = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=09bd58ab01a13c8705892ed88691ee30";
		//https://tile.openweathermap.org/map/{temp_new}/{3}/{10}/{10}.png?appid={09bd58ab01a13c8705892ed88691ee30}
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		
		var url_today = "http://api.openweathermap.org/data/2.5/weather?q="+cityId+"&units=metric&APPID=55cb2f94cd8cb2cd65f295b5b4c88b9b";
		var url_timeline = "http://api.openweathermap.org/data/2.5/forecast?q="+cityId+"&units=metric&APPID=55cb2f94cd8cb2cd65f295b5b4c88b9b";
		var url_uv = "http://api.openweathermap.org/data/2.5/uvi?&lon="+geo[0]+"&lat="+geo[1]+"&APPID=55cb2f94cd8cb2cd65f295b5b4c88b9b";
	  	//url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=daa96efd2e3be69169ef76bff0b6faf2"
		// john api: 09bd58ab01a13c8705892ed88691ee30
		//daa96efd2e3be69169ef76bff0b6faf2
		//627605be16f00179b6aed833e7f34a27
		//55cb2f94cd8cb2cd65f295b5b4c88b9b
		// another acount: 55cb2f94cd8cb2cd65f295b5b4c88b9b
		//http://api.openweathermap.org/data/2.5/uvi?&lat=2.35236&lon=48.856461&APPID=55cb2f94cd8cb2cd65f295b5b4c88b9b
		// api for today's weather
		$.ajax({
			url: url_today,
			dataType: "jsonp",
			success : this.parseResponse_today,
			error : function(req, err){ console.log('today API call failed ' + err); }
		});
		// api for the uv index of today
		$.ajax({
			url: url_uv,
			dataType: "json",
			success : this.parseResponse_uv,
			error : function(req, err){ console.log('uv API call failed ' + err); }
		});
		// api for future weather forecast
		$.ajax({
			url: url_timeline,
			dataType: "jsonp",
			success : this.parseResponse_timeline,
			error : function(req, err){ console.log('timeline API call failed ' + err); }
		});
		// once the the data is fetched set home page visible
		this.setState({ display: false });
	}
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			//the main frame of the app
			<div id = {"container_main"} class ={ style.container }>

				{this.state.display ? null :
				<span id = {"backgroundBlur"} class ={ style.backgroundBlur }>
					<HomepageMenu 
					value = {this.state.locate}
					goTocityPage={this.goToCityPage}
					add = {this.goToCityPage}
					refresh = {this.fetchWeatherData}
					/>
					
					<HomepageCurrent
					main_icon ="main_icon"
					cond = {this.state.cond}
					tempStyles = {tempStyles}
					temp = {this.state.temp}
					humidity = {this.state.humidity}
					uv = {this.state.uv}
					status = {this.state.status}
					wind = {this.state.wind}
					sunrise = {this.state.sunrise}
					sunset = {this.state.sunset}
					clock = {this.state.clock}
					locate = {this.state.locate}
					timeoff = {this.state.timeoff}
					support = {this.state.support}
					icon_uv_id = {"icon_uv"}
					/>
					<HomepageFuture 
					id = "below_area"

					future_table_id = "below_future_table"
					future_temp = {this.state.future_temp}
					future_icon_list = {this.state.future_icon_list}
					timeline_time = {this.state.timeline_time}
					timeline_temp = {this.state.timeline_temp}
					timediff = {this.state.timediff}
					 />
					
					<MusicRecommendation 
					weather_cond ={this.state.cond} 
					hiding = {this.hiding_future}
					showing = {this.showing_future}
					showBelow = {this.state.showBelow}
					click ={this.hiding_future}
					getWeather = {this.getWeather}
					/>
				</span>}
				{this.state.display ? null : <div id = {"cityManage"} class = {style.cityManage} >
					<Mainframe 
					back = {this.back_to_home}
					goToCityPage = {this.goToCityPage}
					onClick ={this.doCityClick} 
					locate = {this.state.locate}
					lon = {this.state.city_geo[0]}
					lat = {this.state.city_geo[1]}
					onTheHomepage ={this.state.onHomepage}
					  />
					
					<div class = {style.cityInput} style ="display: none">
					<form onsubmit ={this.handleSubmit} > 
						<label htmlFor="city">City: </label>
						<input class ={style.input_box_city} 
						type="text" name="city" 
						value={this.state.city} 
						onChange={this.handleChange} 
						onFocus={this.handleFocus.bind(this)} />
						<button class ={style.button_go} 
						type ="submit" onclick ={this.handleSubmit}
						value ="Go" 
						>GO</button>
					</form>
					<h3 style ="display: none" class = {style.cityManage_chosenCity}>Current city: {this.state.city}</h3>
					</div>
				</div>
				}
				
				
				<div class ={ style.details }></div>
			</div>
		);
		
		
	}
	doCityClick = (city_chosen,lon,lat) =>{
		localStorage.setItem("homepage_city", city_chosen);
		localStorage.setItem("homepage_lon", lon);
		localStorage.setItem("homepage_lat", lat);
		//console.log("you clicked the button with "+ city_chosen,lon,lat);
		var geo = [lon, lat];
		this.setState({ locate: city_chosen, city_geo: geo});
		this.fetchWeatherData();
		this.back_to_home();
	}
	getWeather =() =>{
		return this.state.cond;

	}
	handleChange = ({ target }) => {
		var string = target.value;
		var input = string.charAt(0).toUpperCase()+string.substring(1);
		this.setState({ [target.name]: input });
		//console.log("input", input);
	}
	handleSubmit = event => {
		event.preventDefault();
		//alert('Your username is: ' + this.state.city);
		event.target.blur();
		if (this.state.city.toLowerCase() == this.state.locate.toLowerCase()){
			this.back_to_home();
		}
		else{
			this.checkCity();
		}
		
	}
	handleFocus = function(event) {
		event.target.select();
		this.setState({ city: "" });
		//event.target.value ="";
	}
	
	hiding_future = () =>{
		this.setState({showBelow: false});
		var timeline_table = document.getElementById("below_timeline_table");
		var future_container = document.getElementById("below_area");

		timeline_table.style.display = "none";
		future_container.style.display = "none";
		
		
		
		//console.log(this.state.future_temp);
	}
	showing_future = ()=>{
		var timeline_table = document.getElementById("below_timeline_table");
		var future_container = document.getElementById("below_area");
		
		
		$("#below_future_table").empty();
		timeline_table.style.display = "flex";
		//future_container.style.display = "grid";
		$("#below_area").show();
		
		this.setState({showBelow: true});
	}
	
	goToCityPage = () =>{
		//var container_main = document.getElementById("container_main");
		//container_main.style.display = "none";
		
		//this.musicRecommendation();
		if(this.state.onHomepage){
			$("#below_future_table").empty();
			require("jquery-ui/ui/effects/effect-slide");
			this.setState({onHomepage: false});
			$("#backgroundBlur").hide(1000);
			$("#cityManage").show("slide", {direction: "right"},10);

		}
		else{
			require("jquery-ui/ui/effects/effect-slide");
			this.setState({onHomepage: false});
			$("#backgroundBlur").show(1000);
			$("#cityManage").hide("slide", {direction: "right"}, 500);
		}
	}
	back_to_home = ()=>{
		$("#below_future_table").empty();
		if(!this.state.onHomepage){
			this.setState({onHomepage: true});
			$("#backgroundBlur").show(10);
			//$("#cityManage").toggle(1000);
			$("#cityManage").hide(500);
			
		}
		
		
	}

	
	
	
	parseResponse_uv = (parsed_json) => {
		var uv = parsed_json["value"];
		
		var ele = document.getElementById("icon_uv");
		var color = "green";
		var status = "";
		if (uv<=2.9){color = "green";status = "Low";}
		else if (uv<=5.9){color = "yellow";status = "Moderate";}
		else if (uv<=7.9){color = "orange";status = "High";}
		else if (uv<=10.9){color = "red";status = "Very high";}
		else {color = "violet";status = "Extreme";}
		
		ele.style.backgroundColor = color;
		ele.style.border = "1px solid "+color;
		ele.style.borderRadius = "5px";
		ele.style.padding = " 0 5px 0 5px";
		
		this.setState({
			uv: uv+ "\t\t",
			status: status
		});
	}
	
	parseResponse_today = (parsed_json) => {
		// setting up the mian temp first, due to this state wiil be used by other related variables
		var temp_c = Math.round(parsed_json['main']['temp']);
		var location = parsed_json['name'];
		this.setState({
			temp: temp_c,
			locate: location
		});
		
		var currentTime = new Date(Date.now()+ this.state.timediff).toLocaleTimeString();
		// wind data in future api
		var sunrise = new Date(parsed_json['sys']['sunrise']*1000+this.state.timediff).toLocaleTimeString();
		var sunset = new Date(parsed_json['sys']['sunset']*1000+ this.state.timediff).toLocaleTimeString();	
		//==================================
		//							       =
		// set up for the bacground-image  =
		//						      	   =
		// set up for the current time     =
		//						      	   =
		//==================================
		
		var style_name  =location.charAt(0).toLowerCase()+location.substring(1);
		
		$.getJSON("https://raw.githubusercontent.com/YZ6565785/world_city_list/master/city_bg_list.json", function(data){

			var found =false;
			$.each(data, function(key,val){
				if(val.name ==location){
					found =true;
					if(style_name.split(" ").length > 1){
						var tem ="";
						for (var i=0; i<style_name.length; i++){
							if (style_name[i] != " "){
								tem = tem + style_name[i];
							}
						}
						style_name = tem;
					}
					
					return false;
				}
				
			});
			if(!found){
				style_name ="";
			}
			if (currentTime >= sunrise && currentTime <= sunset){style_name += "_d";}
			else {style_name += "_n";}
			
			document.getElementById("backgroundBlur").style.setProperty('--bgImage', "url('assets/backgrounds/"+style_name+".png')")
		});
		
		
		

		
		var conditions = parsed_json['weather']['0']['description'];
		var condition_main = parsed_json['weather']['0']['main'];
		
		//console.log("currentTime", currentTime);
		var weather_icon_id = parsed_json["weather"]["0"]["icon"];
		var humidity = parsed_json['main']['humidity'];
		//showing each weather icon depends on the API feedback[weather.main]
		var weather_list = ["Sun", "Rain", "Snow", "Clouds","Clear"];
		var icon_src = document.getElementById("main_icon");
		//console.log(weather_icon_id);
		var setIcon = require('./setIcon/index.js');
		icon_src.src = setIcon.setUpIcons(weather_icon_id);
		
		
		//=============================
		//							  =
		// set up for the indicators  =
		//							  =
		//=============================
		
		

		// set states for fields so they could be rendered later on
		this.setState({
			main_icon_id: weather_icon_id,
			main: condition_main,
			cond : conditions,
			display: false,
			humidity: humidity,
			//wind: wind,
			sunrise: sunrise,
			sunset: sunset
			
		});
		console.log("now switch to: "+ location)

		
		
		
			//"<style>.backgroundBlur:before{background-image: url('/assets/backgrounds/london_d.png');}</style>"
	}// end of the today's api
	
	
	parseResponse_timeline = (parsed_json) => {


		//===========================
		//							=
		// set up for the timeline  =
		//							=
		//===========================
		var temp_list = [];
		// parse data for each timeline column (every 3 hour)
		for (var i = 0; i<9; i++){
			var temp_hour = Math.round(parsed_json['list'][i]['main']['temp']);
			temp_list.push(temp_hour+"°");
		}
		temp_list.splice(0,0,this.state.temp+"°");

		// wind
		//===================================
		//							        =
		// set up for the indicators: wind  =
		//							        =
		//===================================
		var wind_deg = parsed_json['list'][0]['wind']['deg'];
		var wind_direction = "";
		//var wind_dirction = ["N", "NE", "E", "SE", "SW", "W", "NW"]
		if (wind_deg > 340 || wind_deg <= 10){
			wind_direction = "N";
		}
		else if (wind_deg > 10 && wind_deg <= 70){
			wind_direction = "NE";
		}
		else if (wind_deg > 70 && wind_deg <= 100){
			wind_direction = "E";
		}
		else if (wind_deg > 100 && wind_deg <= 160){
			wind_direction = "SE";
		}
		else if (wind_deg > 160 && wind_deg <= 190){
			wind_direction = "S";
		}
		else if (wind_deg > 190 && wind_deg <= 250){
			wind_direction = "SW";
		}
		else if (wind_deg > 250 && wind_deg <= 280){
			wind_direction = "W";
		}
		else if (wind_deg > 280 && wind_deg <= 340){
			wind_direction = "NW";
		}
		else{
			wind_direction = "";
			console.warn("Direction error: " + wind_deg);
		}
		
		wind_direction +=", ";
		var wind = wind_direction + parsed_json['list'][0]['wind']['speed'] + "mps";
		
		
		//=================================
		//							      =
		// set up for the future weather  =
		//							      =
		//=================================
		console.log("start setting up future:");
		var future_temp_icon_list = [];
		var future_temp_list = [];
		var foo = parsed_json['list']['2']['dt_txt'];
		var day_count =0;
		var today_min = Math.round(parseInt(parsed_json['list'][0]['main']['temp']));
		var today_max = Math.round(parseInt(parsed_json['list'][0]['main']['temp']));
		var today_icon = this.state.main_icon_id;
		var onFirstday = true;
		for (var i=0; i<parsed_json['list'].length; i++){
			var forecast_temp = Math.round(parseInt(parsed_json['list'][i]['main']['temp']));
			if(onFirstday){
				if(forecast_temp<today_min){
					today_min = forecast_temp;
				}
				if(forecast_temp>today_max){
					today_max = forecast_temp;
					today_icon = parsed_json['list'][i]["weather"]["0"]["icon"];
				}
			}
			var day_time = parseInt(new Date(new Date(parsed_json['list'][i]['dt_txt']).getTime() + this.state.timediff).getHours());
			
			if (day_time >= 24 || day_time <3){
				onFirstday = false;
				var j = i;
				var end = i+8;
				if (end>=parsed_json['list'].length){end=parsed_json['list'].length;}
				var day_min = Math.round(parsed_json['list'][i]['main']['temp']);
				var day_max = Math.round(parsed_json['list'][i]['main']['temp']);
				var icon_id = "01d";
				for (j; j<end; j++){
					var temp_eachHour = Math.round(parsed_json['list'][j]['main']['temp']);
					if (temp_eachHour < day_min){
						day_min = temp_eachHour;
					}
					if (temp_eachHour > day_max){
						day_max = temp_eachHour;
					}
					var icon_id_eachHour = parsed_json["list"][j]["weather"]["0"]["icon"];
					if (parseInt(new Date(new Date(parsed_json['list'][j]['dt_txt']).getTime() + this.state.timediff).getHours()) >
					12 && parseInt(new Date(new Date(parsed_json['list'][j]['dt_txt']).getTime() + this.state.timediff).getHours()) <=
					15){
						icon_id = icon_id_eachHour;
					}
				}
				day_count++;
				future_temp_list.push({"min": day_min+"°", "max": day_max+"°"});
				future_temp_icon_list.push(icon_id);
			}
			
		}
		future_temp_list.splice(0,0,{"min": today_min+"°", "max": today_max+"°"});
		future_temp_icon_list.splice(0,0,today_icon);
		// when the api does not show 6 days:::
		for (var i=future_temp_list.length; i<6; i++){
			future_temp_list.push({"min": 0+"°", "max": 0+"°"});
			future_temp_icon_list.push("-1");
		}

		//console.log("city: "+this.state.locate+ ", future temp list: "+ future_temp_list);
		
		//=================================
		//							      =
		// set up for the future weather  =
		//							      =
		//=================================
		var future_temp_icon_list = [];
		var future_temp_list = [];
		//set up today's wether
		future_temp_icon_list.push(this.state.main_icon_id);
		today_min = this.state.temp
		today_max = this.state.temp
		//end of today's weather
		var onFirstday = true;
		for (var i=0; i<parsed_json['list'].length; i++){
			if(onFirstday){
				if(forecast_temp<today_min){
					today_min = Math.round(parsed_json['list'][i]['main']['temp']);
				}
				if(forecast_temp>today_max){
					today_max = Math.round(parsed_json['list'][i]['main']['temp']);
					today_icon = parsed_json['list'][i]["weather"]["0"]["icon"];
				}
			}
			var day_time = parsed_json['list'][i]['dt_txt'];
			
			if (day_time.split(' ')[1] == "00:00:00"){
				onFirstday = false;
				var j = i;
				var end = i+8;
				if (end>=40){end=39;}
				var day_min = Math.round(parsed_json['list'][i]['main']['temp']);
				var day_max = Math.round(parsed_json['list'][i]['main']['temp']);
				var icon_id = "01d";
				for (j; j<end; j++){
					var temp_eachHour = Math.round(parsed_json['list'][j]['main']['temp']);
					if (temp_eachHour < day_min){
						day_min = temp_eachHour;
					}
					if (temp_eachHour > day_max){
						day_max = temp_eachHour;
					}
					var icon_id_eachHour = parsed_json["list"][j]["weather"]["0"]["icon"];
					if (parsed_json['list'][j]['dt_txt'].split(' ')[1] === "15:00:00"){
						icon_id = icon_id_eachHour;
					}
				}
				
				//console.log(day_count);
				
				//console.log("min: " + day_min + ", max: " + day_min);
				future_temp_list.push({"min": day_min+"°", "max": day_max+"°"});
				future_temp_icon_list.push(icon_id);
			}
			
		}
		future_temp_list.splice(0,0,{"min": today_min+"°", "max": today_max+"°"});
		
		// when the api does not show 6 days:::
		for (var i=future_temp_list.length; i<6; i++){
			future_temp_list.push({"min": 0+"°", "max": 0+"°"});
			future_temp_icon_list.push("-1");
		}
		console.log("now it is now: => "+ this.state.locate);
		//console.log("city: "+this.state.locate+ ", future temp list: "+ future_temp_list);
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		var msg = require('./Message.js');
		console.log("message from Message.js:" + msg.sayHelloInSpanish());
		var obj = new Message();
		console.log("obj from Message.js:" + obj.state.message);

		this.setState({
			timeline_temp: temp_list,
			future_icon_list: future_temp_icon_list,
			future_temp: future_temp_list,
			//wind due to today api err
			wind: wind
		});
		


	}// end of timeline api
	fetchTimediff = ()=>{
		$.ajax({
			url: "https://raw.githubusercontent.com/YZ6565785/world_city_list/master/city_bg_list.json",
			dataType: "json",
			success : function(parse_json){
				for (var i=0; i < parse_json.length; i++){
					if (parse_json[i]['name'] == this.state.locate){
						this.setState({timediff: parse_json[i]['tz']*60*60*1000});

						break;
					}
				}
			}.bind(this),
			error : function(req, err){ 
				console.log("#fetching time zone failded"); 
			}
		});
	}
}
