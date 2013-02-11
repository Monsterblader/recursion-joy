//"{"name":"bob","age":1,"subobject":{"number":12,"x":"x"},"subarray":[12,"y"]}"
var stringifyJSON = function(obj) {
  var JSONOutput = "";

  var executeStringifyJSON = function(obj) {
    if (!(obj instanceof Object)) {
      throw new Error("Cannot stringify a non-object");
    }

    var addSurroundingQuotes = function(el){
      var result = "";
      
      //TODO: conditional to check if string contains esc chars

      for(i = 0; i < el.length; i++){
        if(el.slice(i, i + 1) === "\\" || el.slice(i, i + 1) === "\"" ) {
          result += "\\";
        }
        result += el.slice(i, i + 1);
      }

      return '\"' + result + '\"';
    }

    JSONOutput += obj instanceof Array ? "[" : "{";

    if (obj instanceof Array) {
      for(var key in obj) {

        switch (typeof obj[key]) {
          case 'string':
            JSONOutput += addSurroundingQuotes(obj[key]) + ",";
            break;
          case 'number':
          case 'boolean':
            JSONOutput += obj[key] + ",";
            break;
          case 'object':
            if (obj[key] === null) {
              JSONOutput += obj[key] + ",";
            } else {
              executeStringifyJSON(obj[key]);
            }
            break;
          default:
            break;
        }
      }
    } else {
      for(var key in obj) {
        switch (typeof obj[key]) {
          case 'string':
            JSONOutput += addSurroundingQuotes(key) + ':' + addSurroundingQuotes(obj[key]) + ",";
            break;
          case 'number':
          case 'boolean':
            JSONOutput += addSurroundingQuotes(key) + ':' + obj[key] + ",";
            break;
          case 'object':
            if (obj[key] === null) {
              JSONOutput += addSurroundingQuotes(key) + ':' + obj[key] + ",";
            } else {
              JSONOutput += addSurroundingQuotes(key) + ':';
              executeStringifyJSON(obj[key]);
            }
            break;
          default:
            break;
        }
      }
    }
    if(JSONOutput.slice(-1) === ","){
      JSONOutput = JSONOutput.slice(0, JSONOutput.length - 1);
    }
    if(obj instanceof Array) {
      return JSONOutput += "],";
    } else {
      return JSONOutput += "},";
    }
  }

  executeStringifyJSON(obj);
  if(JSONOutput.slice(-1) === ","){
    JSONOutput = JSONOutput.slice(0, JSONOutput.length - 1);
  };
  return JSONOutput;
}