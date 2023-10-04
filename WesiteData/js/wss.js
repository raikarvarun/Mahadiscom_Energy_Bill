
function callAjax(method_type, url, params, varAsync, callBack) {
    var xmlHttp;
    // Creating an XMLHttpRequest object
//        xmlHttp = new XMLHttpRequest();
  //   if (window.ActiveXObject)
      // xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

    // opening and sending request
	// var xmlhttp;
     if (window.XMLHttpRequest)
     {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlHttp=new XMLHttpRequest();
      }
     else
     {// code for IE6, IE5
       xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
     
    xmlHttp.open(method_type,url, varAsync);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(params);

    if (!varAsync) {
        callBack(xmlHttp.responseText);
    }
    else {
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    callBack(xmlHttp.responseText);
                }
            }
        }
    }
}
/*// declared vairble outside the function
var xmlHttp;
function callAjax(method_type, url, params, varAsync, callBack) {
   

    
    // Creating an XMLHttpRequest object
//        xmlHttp = new XMLHttpRequest();
  //   if (window.ActiveXObject)
       //xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

    // opening and sending request
	// Crm js changed Ashutosh
	// var xmlhttp;
	
    if(window.ActiveXObject)
    {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if(window.XMLHttpRequest)
    {
     xmlHttp = new XMLHttpRequest();
    }

     
    xmlHttp.open(method_type, url, varAsync);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(params);

    if (!varAsync) {
        callBack(xmlHttp.responseText);
    }
    else 
    {
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    callBack(xmlHttp.responseText);
                }
            }
        }
    }
}
function callAjaxForConsumerValidation(method_type, url, params, varAsync, callBack) {
  
   if(window.ActiveXObject)
    {
     xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if(window.XMLHttpRequest)
    {
    xmlHttp = new XMLHttpRequest();
    }
    xmlHttp.open(method_type, url, varAsync);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(params);

     callBack(xmlHttp.responseText);
        
    
}



*/