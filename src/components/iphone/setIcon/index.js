//animated icons downloaded from https://www.amcharts.com/free-animated-svg-weather-icons/
//license link: https://creativecommons.org/licenses/by/4.0/

module.exports.setUpIcons = (icon) =>{
	switch (icon){
        //clear sky day
        case "01d":
            return "assets/amcharts_weather_icons_1-2/animated/day.svg";
            //
            break;
        //clear sky night
        case "01n":
            return "assets/amcharts_weather_icons_1-2/animated/night.svg";
            //
            break;
        //few clouds night
        case "02n":
            return "assets/amcharts_weather_icons_1-2/animated/cloudy-night-1.svg";
            //cloudy-night-1.svg
            //
            break;
        //few clouds day
        case "02d":
            return "assets/amcharts_weather_icons_1-2/animated/cloudy-day-1.svg";
            //cloudy-day-1.svg
            break;
        
        //scattered clouds day
        case "03d":
            return "assets/amcharts_weather_icons_1-2/animated/cloudy-day-3.svg";
            //cloudy-day-3.svg
            break;
        //scattered clouds day
        case "03n":
            return "assets/amcharts_weather_icons_1-2/animated/cloudy-night-3.svg";
            //cloudy-night-3.svg
            break;
        //broken clouds
        case "04d":
        case "04n":
            return "assets/amcharts_weather_icons_1-2/animated/cloudy.svg";
            //cloudy.svg
            break;                                                        
        case "09d"://shower rain day
            return "assets/amcharts_weather_icons_1-2/animated/rainy-3.svg";
            //rainy-3.svg
            break;
        case "09n"://shower rain night
            return "assets/amcharts_weather_icons_1-2/animated/rainy-5.svg";
            //rainy-5.svg
            break;
        case "10d"://rain day
            return "assets/amcharts_weather_icons_1-2/animated/rainy-7.svg";
            //rainy-7.svg
            break;
        case "10n"://rain night
            return "assets/amcharts_weather_icons_1-2/animated/rainy-7.svg";
            //rainy-7.svg
            break;
        case "11d": //thunderstorm
        case "11n":
            return "assets/amcharts_weather_icons_1-2/animated/thunder.svg";
            //thunder.svg
            break;
        case "13d"://snow
        case "13n":
            return "assets/amcharts_weather_icons_1-2/animated/snowy-6.svg";
            //snowy-6.svg
            break;
        case "50d":
            return "assets/icons/fog_s_d.png";
            break;
        case "50n":
            return "assets/icons/fog_s_n.png";
            break;
        default:
            return "assets/amcharts_weather_icons_1-2/animated/weather.svg";
            //weather.svg
    }
};

