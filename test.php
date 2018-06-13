<?php
	require_once("function.php");
	
	$searchon = $_POST["SearchOn"];
	$query = "";
	if($searchon == "Region")
	{
		$query .="&rg=".str_replace(" ","%20",$_POST["Value"]); //Blue%20Mountains 
	}
	else if($searchon == "product")
	{
		$query .='&additionalQuery=productId:("'.$_POST["Value"].'")';
	}
	
	$url = "http://atlas.atdw-online.com.au/api/atlas/products?key=2015201520159&cats=ACCOMM&size=200".$query;
	
	$obj = new test(); // create object of test class
	
	$json = $obj->getdata($url); // call getdata function to get json
	
	echo $json;	
?>