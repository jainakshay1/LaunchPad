variable "resource_name" {
  type = string
}

terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "2.92.0"
    }
  }
}

provider "azurerm" {
  subscription_id = "9156aa47-68d4-4448-8f56-8412ed6e25d5"
  client_id = "fcb6884c-6fa1-41f3-a87d-d2a3ba75dedf"
  client_secret = "ycY8Q~OymOMEpqAqyQd~bQ.snGW2ZAfJkfnvhdA~"
  tenant_id = "7855e5f3-1a97-46df-9f2d-b5d34233f627"
  features {}
}

resource "azurerm_resource_group" "app_grp24" {
  name = var.resource_name
  location = "North Europe"
}
