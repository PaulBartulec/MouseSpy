<?php
session_start();

$db = new SQLite3("MouseSpy.db3");
$result = $db->query("SELECT points FROM visitors");
if(!$result)
  return lastErrorMsg();

$rows = array();
while ($row = $result->fetchArray(SQLITE3_NUM)){
    array_push($rows, $row);
}

echo json_encode($rows);
return;