// JavaScript Document for data handling and ajax calls
// Function to check whether a variable is array or not
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
}
// Function to create and open popup window
var windows = {};
function popupwindow(url, name, w, h) 
{  
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/3)-(h/2)+30;
		
	if(windows.hasOwnProperty(name) && !windows[name].closed ) 
	{
	   windows[name].focus();   
	}
	else  
	{			
		windows[name]=window.open(url,"_blank","toolbar=no,titlebar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width="+w+",height="+h+", top="+top+", left="+left);		
	}	
}

// this function will create a link on product name to open a popup window to display details
function nameFormatter(value,id) {
    var url = "details.html?i="+id;
	var html = "<a href='javascript:void(0);' onclick='popupwindow(\""+url+"\",\"Detail\",1250,350);'>"+value+"</a>";
	return html;	
}

// this function will display image
function imageFormatter(value,name) {
    return '<img src="' + value +'" alt="'+name+'" title="'+name+'" style="text-align:center;" />';
}

// this function will display address in one line seperated by comma
function getAddressinOneLine(add)
{
	var address = "";
	var blkstr = [];
	$.each(add, function(key,val) {                    
	  var str = val;
	  
	  if(str.length > 0 && key!=="address_type")
	  {		
	  	blkstr.push(str);
	  }
	});
	return blkstr.join(", ");
}

// this function will get data from test.php file and display in bootstrap table
function getdata(param,val)
{	
	$.ajax({
			type:'POST',
			data: { SearchOn:param, Value:val },
			url: "test.php",
			dataType: 'json',
			success:function(data)
			{ 	
				var columns = "";
				var total = data.products.product_record.length;
				$("#Total").html("Total Records : "+total);
				gridColumns = $.parseJSON('['+columns+']');
				$.each(data,function(k,v){
					  if(isArray(v))
					  {
					  	$.each(v.product_record,function(){
									var address = getAddressinOneLine(this.addresses.address);
									gridColumns.push({
											 product_name:nameFormatter(this.product_name,this.product_id),
											 score:this.score,
											 addresses:address,
											 owning_organisation_name:this.owning_organisation_name,
											 product_image:imageFormatter(this.product_image,this.product_name)
									});
							});
					  }				 
					
				});
				 
				 $('#table1').bootstrapTable({
						data: gridColumns
					});
			}				
		});
}

// this function will get details of a selected accomodation and display
function getProductDetails(param,val)
{	
	$.ajax({
			type:'POST',
			data: { SearchOn:param, Value:val },
			url: "test.php",
			dataType: 'json',
			success:function(data)
			{ 
				var rec = data.products.product_record;
				var name = rec.product_name;
				var pr_num = rec.product_number;
				var num = rec.product_number;
				var status = rec.status;
				var org_id = rec.owning_organisation_id;
				var org_name = rec.owning_organisation_name;
				var org_num = rec.owning_organisation_number;
				var desc = rec.product_description;
				var cat = rec.product_category_id;
				var address = getAddressinOneLine(rec.addresses.address);
				var img = imageFormatter(rec.product_image,rec.product_name);
				var rating = rec.score;
				
				$("#prod_image").html(img);
				$("#productname").html(name);				
				$("#OwnerName").html(org_num+' - '+org_name);
				$("#productname").html(name);
				$("#Category").html(cat);
				$("#Address").html(address);
				$("#Status").html(status);
				$("#Rating").html(rating);
				$("#Description").html(desc);
			}
		   });
}