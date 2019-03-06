import $ from 'jquery';
module.exports = {
    getTimeDiff(city){
        var timediff = $.ajax({
            url: "assets/localapi/city_bg_list.json",
            dataType: "json",
            success : function (parse_json){
                var result = false;
                var timezone ="";
                for (var i =0; i<parse_json.length;i++){
                    if (parse_json[i]["name"] == city){
                        timezone = parse_json[i]["tz"];
                        result = true;
                        break;
                    }
                }
                // if the city is found call the api to fetch weather
                if(result){
                    return parseInt(timezone)*60*60*1000;
                }
                else{
                    return 0;
                }
            },
            error : function(req, err){ 
                console.log('city not found ' + err); 
            }
        });
        return timediff;
    },
    checkContains (city) {
        var result = false;
        $.ajax({
            url: "assets/localapi/city_bg_list.json",
            dataType: "json",
            success : function(parse_json){
                for (var i =0; i<parse_json.length;i++){
                    if (parse_json[i]["name"] == city){
                        result = true;
                        break;
                    }
                }
                result = false;
            },
            error : function(req, err){ 
                console.log('city not found ' + err); 
            }
        });
        return result;
    }
}