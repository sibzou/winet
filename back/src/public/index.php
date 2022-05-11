<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
   // error_reporting(0);

    $method = $_SERVER["REQUEST_METHOD"];
    $uri = $_SERVER["REQUEST_URI"];

    $inputJson = file_get_contents("php://input");
    $input = json_decode($inputJson);

    $db = new SQLite3("../../db");
    $db->query("pragma foreign_keys = on");

    function echoNotFound() {
        http_response_code(404);
        echo "Not found\n";
    }

    if($method == "POST" && $uri == "/signup") {
        $stmt = $db->prepare("insert into user(name, password) values(:username, :password)");
        $passwordHash = password_hash($input->password, PASSWORD_DEFAULT);

        $stmt->bindValue("username", $input->username);
        $stmt->bindValue("password", $passwordHash);

        if(!$stmt->execute()) {
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

        $stmt = $db->prepare("insert into session(userId, token) values(:userid, :token)");
        $token = bin2hex(random_bytes(8));

        $stmt->bindValue("userid", $row["id"]);
        $stmt->bindValue("token", $token);

        if($stmt->execute()) {
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

        if(!isset($sessionUid)) {
            echoNotFound();
            return;
        }

        if($method == "GET" && $uri == "/search") {
            $stmt = $db->prepare("select wine.id, wine.name as name, category.name as category from wine, category, vineyard, color where wine.categoryId = category.id and wine.vineyardId = vineyard.id and wine.colorId = color.id and (wine.name like :query or vineyard.name like :query or color.name like :query)");
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
        } else if($method == "POST" && $uri == "/rate") {
            if($input->rate < 0 || $input->rate > 10) {
                http_response_code(500);
                return;
            }

            $stmt = $db->prepare("insert into rate values(:userId, :wineId, :rate)");

            $stmt->bindValue("userId", $sessionUid);
            $stmt->bindValue("wineId", $input->wineId);
            $stmt->bindValue("rate", $input->rate);

            if(!$stmt->execute()) {
                http_response_code(500);
            }
        } else if($method == "GET" && $uri == "/wine") {
            $stmt = $db->prepare("select wine.name, category.name as category, vineyard.name as vineyard, color.name as color from wine, category, vineyard, color where wine.id = :wineId and category.id = wine.categoryId and vineyard.id = wine.vineyardId and color.id = wine.colorId");
            $stmt->bindValue("wineId", $input->id);

            $res = $stmt->execute();
            $row = $res->fetchArray();

            if(!$row) {
                http_response_code(500);
                return;
            }

            $wine["name"] = $row["name"];
            $wine["category"] = $row["category"];
            $wine["vineyard"] = $row["vineyard"];
            $wine["color"] = $row["color"];

            echo json_encode($wine);
        } else if($method == "POST" && $uri == "/favorite") {
            $stmt = $db->prepare("insert into favorite values(:userId, :wineId)");
            $stmt->bindValue("userId", $sessionUid);
            $stmt->bindValue("wineId", $input->id);

            if(!$stmt->execute()) {
                http_response_code(500);
            }
        } else {
            echoNotFound();
        }
    }
?>
