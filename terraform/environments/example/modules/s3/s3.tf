resource "aws_s3_bucket" "generic_bucket" {
  bucket = ""

  tags = {
    Env = ""
  }
}