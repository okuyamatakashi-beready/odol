<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
} else {
    header("Location: index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Submission</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Confirm Your Submission</h1>
    <form action="send_mail.php" method="post">
        <p>Name: <?php echo $name; ?></p>
        <input type="hidden" name="name" value="<?php echo $name; ?>">
        
        <p>Email: <?php echo $email; ?></p>
        <input type="hidden" name="email" value="<?php echo $email; ?>">
        
        <p>Message: <?php echo nl2br($message); ?></p>
        <input type="hidden" name="message" value="<?php echo $message; ?>">
        
        <button type="submit">Send</button>
        <button type="button" onclick="history.back();">Back</button>
    </form>
</body>
</html>
