<?php

$method = $_SERVER['REQUEST_METHOD'];
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

switch ($method) {
  case 'PUT':
    break;
  case 'POST':
    postdata();
    break;
  case 'GET':
    getData();
    break;
  case 'HEAD':
    break;
  case 'DELETE':
    break;
  case 'OPTIONS':
    break;
  default:
    break;
}

function postData() {
    $username = "root";
    $password = "root";
    $hostname = "localhost"; 

    $fd = fopen("/tmp/a.txt", "w");
    fwrite($fd, $result);
    fclose($fd);

    // Get POST vars
    $name = $_POST["name"];
    $email = $_POST["email"];
    $date= $_POST["date"];
    
    //connection to the database
    $dbhandle = mysql_connect($hostname, $username, $password) 
        or die("Unable to connect to MySQL");

    //select a database to work with
    $selected = mysql_select_db("testing",$dbhandle) 
        or die("Could not select testing");

    //insert query
    $sql = "insert into clients(name, email, signup_date) values ('$name', '$email', '$date')";

    $result = mysql_query($sql);

    //close the connection
    mysql_close($dbhandle);
    
    if ($result) {
        header('HTTP/1.1 200 OK');
    }

    else {
        header('HTTP/1.1 500 Internal Server Error');
    }

}



function getData() {
    $username = "root";
    $password = "root";
    $hostname = "localhost"; 

    //connection to the database
    $dbhandle = mysql_connect($hostname, $username, $password) 
        or die("Unable to connect to MySQL");

    //select a database to work with
    $selected = mysql_select_db("testing",$dbhandle) 
        or die("Could not select testing");

    //execute the SQL query and return records
    $result = mysql_query("SELECT * FROM clients");

    //fetch tha data from the database 
    $rows = array();
    while ($row = mysql_fetch_assoc($result)) {
        $rows[] = $row;
    }
    //close the connection
    mysql_close($dbhandle);

    header('Content-Type: application/json');
    echo json_encode($rows);


}



?>
