# data "terraform_remote_state" "api_clean_arch_bp" {
#   backend = "remote"
#   config = {
#     hostname     = "app.terraform.io"
#     organization = "aworg"

#     workspaces = {
#       name = "api_clean_arch_bp"
#     }
#   }
# }