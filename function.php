<?php
class test
{
	public function getdata($path)
	{		
		$string_data = $path;
		
		//get file contents in variable
		$xmlfile = file_get_contents($string_data);
		// load the xml file into string 
		$xml = simplexml_load_string($xmlfile); 
		
		//convert into json
		$json  = json_encode($xml);
		return $json;
		
	}
}
?>