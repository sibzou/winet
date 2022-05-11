<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');

    $method = $_SERVER["REQUEST_METHOD"];
    $uri = $_SERVER["REQUEST_URI"];

    $inputJson = file_get_contents("php://input");
    $input = json_decode($inputJson);

    $db = new SQLite3("../../db");

    $stmt = $db->query("delete from session where start + " . (60 * 20) . " < unixepoch()");

    function echoNotFound() {
        http_response_code(404);
        echo "Not found\n";
    }

    if($method == "POST" && $uri == "/signup") {
        $stmt = $db->prepare("insert into user(name, password) values(:username, :password)");
        $passwordHash = password_hash($input->password, PASSWORD_DEFAULT);

        $stmt->bindValue("username", $input->username);
        $stmt->bindValue("password", $passwordHash);

        if($stmt->execute()) {
            http_response_code(200);
        } else {
            http_response_code(500);
        }
    } else if($method == "POST" && $uri == "/signin") {
        $stmt = $db->prepare("select id, password from user where name = :username");
        $stmt->bindValue("username", $input->username);

        $res = $stmt->execute();
        $row = $res->fetchArray();

        if(!password_verify($input->password, $row["password"])) {
            http_response_code(500);
            return;
        }

        $stmt = $db->prepare("insert into session(userId, token, start) values(:userid, :token, unixepoch())");
        $token = bin2hex(random_bytes(8));

        $stmt->bindValue("userid", $row["id"]);
        $stmt->bindValue("token", $token);

        if($stmt->execute()) {
            http_response_code(200);
            echo $token;
        } else {
            http_response_code(500);
        }
    } else {
        $stmt = $db->prepare("select userId from session where token = :token");
        $stmt->bindValue("token", $input->token);

        $res = $stmt->execute();
        $row = $res->fetchArray();
        $sessionUid = $row["userId"];

        $stmt = $db->prepare("update session set start = unixepoch() where userId = :userId");
        $stmt->bindValue("userId", $sessionUid);
        $stmt->execute();

        if(!isset($sessionUid)) {
            echoNotFound();
            return;
        }

        if($method == "GET" && $uri == "/search") {
            $stmt = $db->prepare("select wine.id, wine.name as name, category.name as category from wine, category where wine.categoryId = category.id and wine.name like :query");
            $stmt->bindValue("query", "%" . $input->query . "%");

            $res = $stmt->execute();
            $searchArray = [];
            $row = $res->fetchArray();

            while($row) {
                $wine = [];
                $wine["id"] = $row["id"];
                $wine["name"] = $row["name"];
                $wine["category"] = $row["category"];

                $searchArray[] = $wine;
                $row = $res->fetchArray();
            }

            echo json_encode($searchArray);
        } else {
            echoNotFound();
        }
    }
?>
