<?php
session_start();
$db = new SQLite3("MouseSpy.db3");
$result = $db->exec("CREATE TABLE IF NOT EXISTS visitors(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session TEXT NOT NULL,
  points TEXT NOT NULL)");
if(!$result)
  return lastErrorMsg();

$result = $db->exec("INSERT INTO visitors (session, points) VALUES ('" . session_id() . "', '" . file_get_contents('php://input') . "')");
if(!$result)
  return lastErrorMsg();