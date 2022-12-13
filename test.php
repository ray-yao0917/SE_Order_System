<?php
	include('file.php'); 
	$dataJson = 'StudentsInf.json';
	$studentJson = 'user.json';
	$subjectJson = 'subject.json';
	$StudentsInf = getFile('StudentsInf.json');
	$user = getFile('user.json');
	$subject = getFile('subject.json');
	$new = $StudentsInf;
	foreach($StudentsInf as $keyI => $valueI){
		foreach($user as $key => $value){
			if($valueI["UserId"] === $value["id"]){
				$new[$keyI]["UserName"] = $value["name"];
			}
		}
		foreach($subject as $keyS => $valueS){
			if($valueI["SubjectId"] === $valueS["id"]){
				$new[$keyI]["SubjectName"] = $valueS["subject"];
			}
		}
	}
	print_r($new);
	$_user = max($user);
	$_subject = max($subject);
	$newUserId = $_user["id"]+1;
	$newSubjectId = $_subject["id"]+1;
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$nameN = $_POST['StudentsName'];
		writeFile($user, $nameN , $studentJson ,$newUserId , $name);
		$study = $_POST['SubjectName'];
		writeFile($subject, $study , $subjectJson ,$newSubjectId , $subject);

		$StudentData = $_POST['Score'];
		array_push($StudentsInf, $StudentData);
		$__Json = json_encode($StudentsInf);
		file_put_contents($dataJson, $__Json);
		
	}
	
	
?>	

