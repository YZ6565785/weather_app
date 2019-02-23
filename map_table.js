future_table = () =>{
			let table =[];

			// Outer loop to create parent
			let row1 = [];
			let row2 = [];
			//Inner loop to create children
			var arr = this.state.future_temp && this.state.future_temp.map((obj, index) => {
				return obj;
			});
			//console.log(arr);
			
			row1.push(this.state.future_temp&&this.state.future_temp.map((obj, index) => {
				if (index <=2){
					//console.log("index: " + index);
					return (
						<td class ={style.future_box} key={`${obj.min}_{obj.max}`}>
						<p class = {style.future_temp}>{obj.min}/<span id = {style.future_temp_max}>{obj.max}</span></p>
						<img id = {"future_icon_"+(index+1).toString()} class ={style.future_icons} alt="future icons" width= "50" height = "50" />
						<div id = {"future_day_"+(index+1).toString()}></div>
					</td>);
				}
				else{
					return null;
				}
				
			}));
			
			//Create the parent and add the children
			table.push(<tr>{row1}</tr>);
			
			
			
			row2.push(this.state.future_temp&&this.state.future_temp.map((obj, index) => {
				if (index >2){
					return (<td class ={style.future_box} key={`${obj.min}_{obj.max}`}>
					<p class = {style.future_temp}>{obj.min}/<span id = {style.future_temp_max}>{obj.max}</span></p>
					<img id = {"future_icon_"+(index+1).toString()} class ={style.future_icons} alt="future icons" width= "50" height = "50" />
					<div id = {"future_day_"+(index+1).toString()}></div>
					</td>);
				}
				else{
					return null;
				}
			}));
			
			
			for (var i =3+row2.length+1; i<6; i++){
				row2.push(<td class ={style.future_box}><p class = {style.future_temp}>{0+"°"}/<span id = {style.future_temp_max}>{0+"°"}</span></p><img id = {"future_icon_"+(i+1).toString()} class ={style.future_icons} alt="future icons" width= "50" height = "50" />
				<div id = {"future_day_"+(i+1).toString()}></div></td>)
			}
			
			
			//Create the parent and add the children
			table.push(<tr>{row2}</tr>);
			
			
			
			
			
			//console.log(this.state.time_list);
			return table;
	}