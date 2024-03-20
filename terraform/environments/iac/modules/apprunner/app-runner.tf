resource "aws_iam_role" "apprunner_role" {
  name = "${var.environment}_${var.service_name}_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = [
            "build.apprunner.amazonaws.com",
            "tasks.apprunner.amazonaws.com"
          ]
        }
      }
    ]
  })
}

resource "aws_iam_policy" "ecr_policy" {
  name        = "${var.environment}_${var.service_name}_ecr_policy"
  description = "Policy for accessing ECR"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid    = "VisualEditor0",
        Effect = "Allow",
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:DescribeImages"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecr_policy_attachment" {
  policy_arn = aws_iam_policy.ecr_policy.arn
  role       = aws_iam_role.apprunner_role.name
}
resource "time_sleep" "waitrolecreate" {
  depends_on = [aws_iam_role.apprunner_role]
  create_duration = "60s"
}

resource "aws_apprunner_auto_scaling_configuration_version" "apprunner-autoscaling" {
  auto_scaling_configuration_name = "${var.environment}_${var.service_name}_auto_scalling"
  max_concurrency = 100
  max_size        = var.autoscaling_max
  min_size        = var.autoscaling_min

  tags = {
    Env = var.environment
  }
}

resource "aws_apprunner_service" "api_clean_arch" {
  depends_on = [time_sleep.waitrolecreate]
  service_name = "${var.environment}_${var.service_name}"
  source_configuration {
    image_repository {
      image_configuration {
        port = var.port
      }
      image_identifier      =  var.image
      image_repository_type = "ECR"
    }
    auto_deployments_enabled = false
    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_role.arn
    }
  }
  auto_scaling_configuration_arn = aws_apprunner_auto_scaling_configuration_version.apprunner-autoscaling.arn

  tags = {
    Env = var.environment
  }
}
