provider "aws" {
  region = "us-west-2"
}

locals {
  service_release_tag = "latest"
}
resource "aws_ecr_repository" "clean_arch_repo" {
  name                 = "clean-arch-repo"
  image_tag_mutability = "IMMUTABLE"
}
