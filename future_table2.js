future_table2 = () =>{
		
		var future_temp_min = this.state.future_temp && this.state.future_temp.map((obj, index) =>{
			return obj.min;
		});
		var future_temp_max = this.state.future_temp && this.state.future_temp.map((obj, index) =>{
			return obj.max;
		});
		console.log(future_temp_min);
		
		let table =[];

		let row1 = [];
		let row2 = [];
		
		for (var i =0; i < 3; i++){
			row1.push(
				<td class ={style.future_box}>
					<p class = {style.future_temp}>{future_temp_min[i]}/<span id = {style.future_temp_max}>{future_temp_max[i]}</span></p>
					<img id = {"future_icon_"+(i+1).toString()} class ={style.future_icons} alt="future icons" width= "50" height = "50" />
					<div id = {"future_day_"+(i+1).toString()}></div>
				</td>
			);
		}
		
		//console.log(row1);
		table.push(<tr>{row1}</tr>);
		for (var i =3; i < future_temp_max.length; i++){
			row2.push(
				<td class ={style.future_box}>
					<p class = {style.future_temp}>{future_temp_min[i]}/<span id = {style.future_temp_max}>{future_temp_max[i]}</span></p>
					<img id = {"future_icon_"+(i+1).toString()} class ={style.future_icons} alt="future icons" width= "50" height = "50" />
					<div id = {"future_day_"+(i+1).toString()}></div>
				</td>
			);
		}
		for (var i =3+row2.length; i<6; i++){
			row2.push(
				<td class ={style.future_box}>
					<p class = {style.future_temp}>{future_temp_min[i]}/<span id = {style.future_temp_max}>{future_temp_max[i]}</span></p>
					<img id = {"future_icon_"+(i+1).toString()} class ={style.future_icons} alt="future icons" width= "50" height = "50" />
					<div id = {"future_day_"+(i+1).toString()}></div>
				</td>
			);
		}
		table.push(<tr>{row2}</tr>);
		return table;
	}