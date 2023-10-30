provider "aws" {
  region = "us-west-2" # Change this to your preferred region
}

resource "aws_ecr_repository" "clean_arch_repo" {
  name                 = "clean-arch-repo"
  image_tag_mutability = "IMMUTABLE"
}

resource "aws_apprunner_service" "api_lean_arch" {
  service_name = "api-clean-arch-bp"
  source_configuration {
    image_repository {
      image_configuration {
        port = "8000"
      }
      image_identifier      = aws_ecr_repository.clean_arch_repo.repository_url
      image_repository_type = "ECR_PRIVATE"
    }
    auto_deployments_enabled = false
  }

  tags = {
    Name = "example-apprunner-service"
  }
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
          Service = "build.apprunner.amazonaws.com"
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
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:BatchCheckLayerAvailability"
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