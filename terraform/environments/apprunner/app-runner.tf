provider "aws" {
  region = "us-west-2"
}

locals {
  service_release_tag = "latest"
}


resource "aws_iam_role" "apprunner_role" {
  name = "apprunner-service-role"

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
  name        = "ecr_policy"
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
resource "aws_apprunner_service" "api_clean_arch" {
  depends_on = [time_sleep.waitrolecreate]
  service_name = "api-clean-arch-bp"
  source_configuration {
    image_repository {
      image_configuration {
        port = "3000"
      }
      image_identifier      = "157233251312.dkr.ecr.us-west-2.amazonaws.com/clean-arch-repo:0.0.1"
      image_repository_type = "ECR"
    }
    auto_deployments_enabled = false
    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_role.arn
    }
  }

  tags = {
    Name = "example-apprunner-service"
  }
}
