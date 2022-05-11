<?php
    $uri = $_SERVER["REQUEST_URI"];

    if($uri == "/signup") {
        echo "Not implemented";
    } else {
        http_response_code(404);
        echo "Not found";
    }
?>
