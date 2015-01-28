var transforms_mf = {
  'object':{'tag':'div','class':'package ${show} ${type}','children':[
  {'tag':'div','class':'header_mf','children':[
  {'tag':'div','class':function(obj){
    if( getValue(obj.value) !== undefined ) return('arrow hide');
    else return('arrow');
  }},
  {'tag':'span','class':'name','html':'${name}'},
  {'tag':'span','class':'value','html':function(obj) {
    var value = getValue(obj.value);
    if( value !== undefined ) return(" : " + value);
    else return('');
  }},
  {'tag':'span','class':'type','html':'${type}'}
  ]},
  {'tag':'div','class':'children','children':function(obj){return(children(obj.value, transforms_mf));}}
  ]}
};

var transforms_md = {
  'object':{'tag':'div','class':'package ${show} ${type}','children':[
  {'tag':'div','class':'header_md','children':[
  {'tag':'div','class':function(obj){
    if( getValue(obj.value) !== undefined ) return('arrow hide');
    else return('arrow');
  }},
  {'tag':'span','class':'name','html':'${name}'},
  {'tag':'span','class':'value','html':function(obj) {
    var value = getValue(obj.value);
    if( value !== undefined ) return(" : " + value);
    else return('');
  }},
  {'tag':'span','class':'type','html':'${type}'}
  ]},
  {'tag':'div','class':'children','children':function(obj){return(children(obj.value, transforms_md));}}
  ]}
};
var btn1Pressed = false;
var btn2Pressed = false;

$(function(){
  $('#btnVisualize1').click(function() { 
    var json_string = $('#code_mf').text();
    try {
      var json = JSON.parse(json_string);
      visualize_mf(json);
    } catch (e) {
      alert("Sorry error in json string, please correct and try again: " + e.message);
    }      
    if (!btn1Pressed) {
      btn1Pressed = true;
      $('#code_mf').hide('fast');
      $('#code_mf_h').show();
    } else {
      btn1Pressed = false;
      $('#code_mf').show();
      $('#code_mf_h').hide('fast');
    }
  });
});

function visualize_mf(json) {   
  $('#code_mf_h').html('');
  $('#code_mf_h').json2html(convert('json',json,'open'),transforms_mf.object);

  regEvents_mf();    
}

$(function(){
  $('#btnVisualize2').click(function() {
      var json_string = $('#code_md').text();
      try {
        var json = JSON.parse(json_string);
        visualize_md(json);
      } catch (e) {
        alert("Sorry error in json string, please correct and try again: " + e.message);
      }      
    if (!btn2Pressed) {
      btn2Pressed = true;
      $('#code_md').hide('fast');
      $('#code_md_h').show();
    } else {
      btn2Pressed = false;
      $('#code_md').show();
      $('#code_md_h').hide('fast');
    }      
  });
});

function visualize_md(json) {   
  $('#code_md_h').html('');
  $('#code_md_h').json2html(convert('json',json,'open'),transforms_md.object);

  regEvents_md();    
}

function getValue(obj) {
  var type = $.type(obj);

  //Determine if this object has children
  switch(type) {
    case 'array':
    case 'object':
      return(undefined);
      break;
    case 'function':
      return('function');
      break;

    case 'string':
      return("'" + obj + "'");
      break;

    default:
    return(obj);
    break;
  }
}

//Transform the children
function children(obj, transforms) {
  var type = $.type(obj);
  //Determine if this object has children
  switch(type) {
    case 'array':
    case 'object':
      return(json2html.transform(obj,transforms.object));
    break;
    default:
  //This must be a litteral
  break;
  }
}

function convert(name,obj,show) {
  var type = $.type(obj);
  if(show === undefined) show = 'closed';
  var children = [];
  //Determine the type of this object
  switch(type) {
    case 'array':
      //Transform array
      //Itterrate through the array and add it to the elements array
      var len=obj.length;
      for (var j=0; j<len; ++j) { 
        //Concat the return elements from this objects tranformation
        children[j] = convert(j,obj[j]);
      }
      break;
  
    case 'object':
      //Transform Object
      var j = 0;
      for (var prop in obj) {
        children[j] = convert(prop,obj[prop]);
        j++;
      } 
      break;
  
    default:
      //This must be a litteral (or function)
      children = obj;
      break;
  }

  return( {'name':name,'value':children,'type':type,'show':show} );
}

function regEvents_mf() {

  $('.header_mf').click(function() {
    var parent = $(this).parent();

    if (parent.hasClass('closed')) {
      parent.removeClass('closed');
      parent.addClass('open');
    } else {
      parent.removeClass('open');
      parent.addClass('closed');
    }   
  });
}

function regEvents_md() {

  $('.header_md').click(function() {
    var parent = $(this).parent();

    if (parent.hasClass('closed')) {
      parent.removeClass('closed');
      parent.addClass('open');
    } else {
      parent.removeClass('open');
      parent.addClass('closed');
    }   
  });
}
