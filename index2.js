//animated icons downloaded from https://www.amcharts.com/free-animated-svg-weather-icons/
//license link: https://creativecommons.org/licenses/by/4.0/

module.exports.setUpIcons = (icon) =>{
	switch (icon){
        //clear sky day
        case "01d":
            return "assets/icons/sunny.png";
            //"assets/amcharts_weather_icons_1-2/animated/day.svg";
            break;
        //clear sky night
        case "01n":
            return "assets/icons/moon.png";
            //"assets/amcharts_weather_icons_1-2/animated/night.svg";
            break;
        
        
        //few clouds day
        case "02d":
            return "assets/icons/cloudy.png";
            //return "assets/amcharts_weather_icons_1-2/animated/cloudy-night-1.svg";
            break;
        //few clouds night
        case "02n":
            return "assets/icons/moon.png";
            //return "assets/amcharts_weather_icons_1-2/animated/cloudy-night-1.svg";
            break;
        //scattered clouds day
        case "03d":
            return "assets/icons/cloudy.png";
            //return "assets/amcharts_weather_icons_1-2/animated/cloudy-day-3.svg";
            break;
        //scattered clouds day
        case "03n":
            return "assets/icons/moon.png";
            //return "assets/amcharts_weather_icons_1-2/animated/cloudy-night-3.svg";
            break;
        //broken clouds
        case "04d":
        case "04n":
            return "assets/icons/clouds.png";
            //return "assets/amcharts_weather_icons_1-2/animated/cloudy.svg";
            break;                                                        
        case "09d"://shower rain day
            return "assets/icons/rainy.png";
            //return "assets/amcharts_weather_icons_1-2/animated/rainy-3.svg";
            break;
        case "09n"://shower rain night
            return "assets/icons/rainy.png";
            //return "assets/amcharts_weather_icons_1-2/animated/rainy-5.svg";
            break;
        case "10d"://rain day
            return "assets/icons/rainy.png";
            //return "assets/amcharts_weather_icons_1-2/animated/rainy-7.svg";
            break
        case "10n"://rain night
            return "assets/icons/rainy.png";
            //return "assets/amcharts_weather_icons_1-2/animated/rainy-7.svg";
            break;
        case "11d": //thunderstorm
        case "11n":
            return "assets/icons/storm.png";
            //return "assets/amcharts_weather_icons_1-2/animated/thunder.svg";
            break;
        case "13d"://snow
        case "13n":
            return "assets/icons/storm.png";
            //return "assets/amcharts_weather_icons_1-2/animated/snowy-6.svg";
            break;
        case "50d":
            return "assets/icons/fog_s_d.png";
            break;
        case "50n":
            return "assets/icons/fog_s_n.png";
            break;
        default:
            return "assets/icons/lock.png";
            //return "assets/amcharts_weather_icons_1-2/animated/weather.svg";
    }
};

