resource "aws_sns_topic" "ses_notification_topic" {
  name = "${var.name}_ses_notification_topic"
}

resource "aws_ses_receipt_rule_set" "ses_rule_set" {
  rule_set_name = "${var.name}_ses_rule_set"
}

resource "aws_ses_receipt_rule" "ses_receipt_rule" {
  name          = "${var.name}_ses_receipt_rule"
  rule_set_name = aws_ses_receipt_rule_set.ses_rule_set.rule_set_name

  recipients = [var.email]

  sns_action {
    topic_arn = aws_sns_topic.ses_notification_topic.arn
    position = 1
  }
}