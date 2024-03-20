resource "aws_db_instance" "rds_instance" {
  engine            = "postgres"
  engine_version    = "12.12"
  storage_type      = "gp2"
  instance_class    = "db.t2.micro"  # This specifies the instance size
  allocated_storage = 20  # 20 GB storage, adjust as needed
  publicly_accessible = true
  identifier        = var.databasename
  username          = var.username
  password          = var.password
}