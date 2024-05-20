<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // メールの詳細を設定
    $to = "info@llc-beready.com"; // 受信者のメールアドレスを指定
    $subject = "Contact Form Submission from " . $name;
    $body = "Name: " . $name . "\nEmail: " . $email . "\nMessage:\n" . $message;
    $headers = "From: " . $email;

    // メールのバックアップを保存
    $backup_dir = 'mail_backups';
    if (!file_exists($backup_dir)) {
        mkdir($backup_dir, 0777, true);
    }

    $backup_file = $backup_dir . '/backup_' . date('Y-m-d_H-i-s') . '.txt';
    $backup_content = "To: $to\nSubject: $subject\nHeaders: $headers\n\n$body";
    file_put_contents($backup_file, $backup_content);

    // 管理者へのメールを送信
    $admin_mail_sent = mail($to, $subject, $body, $headers);

    // ログ出力（デバッグ用）
    if ($admin_mail_sent) {
        error_log("Admin email sent successfully.");
    } else {
        error_log("Failed to send admin email.");
    }

    // 自動返信メールの設定
    $reply_subject = "Thank you for contacting us, " . $name;
    $reply_body = "Hello " . $name . ",\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nYour message:\n" . $message . "\n\nBest regards,\nYour Company Name";
    $reply_headers = "From: your-email@example.com"; // 管理者のメールアドレスを指定

    // 自動返信メールを送信
    $user_mail_sent = mail($email, $reply_subject, $reply_body, $reply_headers);

    // ログ出力（デバッグ用）
    if ($user_mail_sent) {
        error_log("User email sent successfully.");
    } else {
        error_log("Failed to send user email.");
    }

    // メール送信の結果に基づいてリダイレクト
    if ($admin_mail_sent && $user_mail_sent) {
        header("Location: thanks.php");
        exit();
    } else {
        echo "Failed to send message.";
    }
} else {
    echo "Invalid request method.";
}
?>
