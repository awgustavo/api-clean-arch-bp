resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "plank_subnets"
  subnet_ids = [aws_subnet.public.id, aws_subnet.private.id]
}

resource "aws_db_instance" "rds_instance" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "14.4"
  instance_class       = "db.t2.micro"
  username             = "admin"
  password             = "admin12345678"
  parameter_group_name = "default.postgres14"

  vpc_security_group_ids = [aws_security_group.rds_sec_group.id]
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
}

resource "aws_security_group" "rds_sec_group" {
  description = "Allow traffic to RDS PostgreSQL instance"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
