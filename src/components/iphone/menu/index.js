//import preact
import {h, render, Component} from 'preact';

// import stylesheets for iphone & button
import style from './style';

export default class HomepageMenu extends Component{
	render (){
		return (
			<span class ={ style.menu }>
				<img class = {style.menu_icon} 
				onclick = {this.props.add} 
				src = "assets/icons/add.png" 
				alt="add icon" 
				width ="40" 
				height = "40" 
				/>
				<img class = {style.menu_icon}
				onclick = {this.props.refresh}
				src = "assets/icons/reload.png" 
				alt="share icon" 
				width ="40" 
				height = "40" 
				/>
				<button id = "current_city" 
				class ={ style.city } 
				onclick = {this.props.goTocityPage}
				>
					{ this.props.value }
				</button>
			</span>
		);
	}
}