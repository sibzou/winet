<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');

    $method = $_SERVER["REQUEST_METHOD"];
    $uri = $_SERVER["REQUEST_URI"];

    $inputJson = file_get_contents("php://input");
    $input = json_decode($inputJson);

    $db = new SQLite3("../../db");

    function executeSql($stmt) {
        if($stmt->execute()) {
            http_response_code(200);
        } else {
            http_response_code(500);
        }
    }

    if($method == "POST" && $uri == "/signup") {
        $stmt = $db->prepare("insert into user(name, password) values(:username, :password)");
        $passwordHash = password_hash($input->password, PASSWORD_DEFAULT);

        $stmt->bindValue("username", $input->username);
        $stmt->bindValue("password", $passwordHash);

        executeSql($stmt);
    } else {
        http_response_code(404);
        echo "Not found\n";
    }
?>
