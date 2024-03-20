# module "bp_app_development" {
#   source       = "./modules/apprunner/"
#   service_name = "bp_app"
#   port         = 3000
#   image        = "157233251312.dkr.ecr.us-west-2.amazonaws.com/clean-arch-repo:latest"
#   environment  = "development"
#   autoscaling_min = 1
#   autoscaling_max = 2
# }

module "bp_database_development" {
  source       = "./modules/rds/"
  username     = "portgres"
  password     = "admin123"
  databasename = "development"
}
