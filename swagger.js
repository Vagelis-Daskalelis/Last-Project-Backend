const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options = {
    "components": {
        "schemas":{
        User: m2s(User),
        Product: m2s(Product),
    }
    },
    "openapi":"3.1.0",
    "info":{
        "version":"1.0.0",
        "title":"Products CRUD API",
        "description": "Products project aplication",
        "contact": {
            "name": "API Support",
            "url": "http://www.example.com",
            "email": "support@example.com"
        }
    },
    "servers": [
        {
            url: 'http://localhost:3000',
            description: 'Local Server'
        },
        {
            url:'http://www.example.com',
            description:"Testin server"
        }
    ],
    "tags": [
        {
         "name":"Users",
         "description":"API endpoints for Users"
        },
        {
            "name":"Products",
            "description":"API endpoints for Products"
        },
        {
            "name":"Products and Producers",
            "description":"API endpoints for Products and their Producers"
        }
    ],
    "paths":{
        "/api/users":{
            "get":{
                "tags":["Users"],
                "description": "Returns all users",
                "responses":{
                    "200": {
                        "description": "A list of users",
                        "content": {
                            "application/json":{
                                "schema": {
                                    "type":"array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post":{
                "tags": ["Users"],
                "description":"Create new user",
                "requestBody":{
                  "description":"User schema to insert",
                  "content":{
                    "application/json":{
                      "schema":{
                        "type":"object",
                        "properties":{
                          "username": {"type":"string"},
                          "password": {"type":"string"},
                          "name": {"type":"string"},
                          "surname": {"type":"string"},
                          "email": {"type":"string"},
                        },
                        "required":["username", "password","email"]
                      }
                    }
                  }
                },
                "responses":{
                  "200":{
                    "description": "New user inserted"
                  }
                }
              }
        },
          "/api/users/login":{
            "post":{
              "tags": ["Users"],
              "description":"login",
              "requestBody":{
                "description":"User schema to login",
                "content":{
                  "application/json":{
                    "schema":{
                      "type":"object",
                      "properties":{
                        "password": {"type":"string"},
                        "email": {"type":"string"},
                      },
                      "required":["password","email"]
                    }
                  }
                },
                
              },
              "responses":{
                "200":{
                  "description": "login"
                }
              }
            }
          },
        "/api/users/{username}":{
            "patch":{
                "tags":[ "Users" ],
                "description":"Update user in app",
                "parameters":[
                  {
                    "name":"username",
                    "in":"path",
                    "required":true,
                    "description":"Username of user to update",
                    "type":"string"
                  },
                ],
                "requestBody":{
                  "description": "User that we update",
                  "content":{
                    "application/json":{
                      "schema":{
                        "type":"object",
                        "properties":{
                          "password": {"type":"string"},
                          "name": {"type":"string"},
                          "surname": {"type":"string"},
                          "email": {"type": "string"},
                        },
                        "required":["email"]
                      }
                    }
                  }
                },
                "responses":{
                  "200": {
                    "description": "Update user",
                    "schema":{
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
              },
              "delete":{
                "tags":["Users"],
                "description":"Delete a user",
                "parameters":[
                    {
                        "name":"username",
                        "in":"path",
                        "description":"User to delete",
                        "type":"string"
                    },
                ],
                "responses":{
                    "200":{
                        "description":"Delete a user"
                    }
                }
              }
        },
        "/api/products":{
          "get":{
            "tags":["Products"],
            "description":"Returns all Products",
            "responses":{
              "200":{
                "description":"A list of products",
                "content":{
                  "application/json":{
                    "schema":{
                      "type":"array",
                      "items":{
                        "$ref":"#/components/schemas/Product"
                      }
                    }
                  }
                }
              }
            }
          },
          "post":{
            "tags":["Products"],
            "decription":"Create new Product",
            "requestBody":{
              "description":"Product schema to insert",
              "content":{
                "application/json":{
                  "schema":{
                    "type":"object",
                    "properties":{
                      "product":{"type":"string"},
                      "cost":{"type":"number"},
                      "description":{"type":"string"},
                      "quantity":{"type":"number"}
                    },
                    "required":["product","cost","description","quantity"]
                  }
                }
              }
            },
            "responses":{
              "200":{
                "description":"New product inserted"
              }
            }
          }
        },
        "/api/products/{product}":{
          "patch":{
            "tags":["Products"],
            "description":"Update product in app",
            "parameters":[
              {
                "name":"product",
                "in":"path",
                "required":true,
                "description":"Product name of product to update",
                "type":"string"
              },
            ],
            "requestBody":{
              "description":"Product that we want to update",
              "content":{
                "application/json":{
                  "schema":{
                    "type":"object",
                    "properties":{
                      "cost":{"type":"number"},
                      "quantity":{"type":"number"}
                    },
                    "required":["cost","quantity"]
                  }
                }
              }
            },
            "responses":{
              "200":{
                "description":"Update product",
                "schema":{
                  "$ref": "#/components/schemas/Product"
                }
              }
            }
          },
          "delete":{
            "tags":["Products"],
            "description":"Delete a product",
            "parameters":[
              {
                "name":"product",
                "in":"path",
                "description":"Product to delete",
                "type":"string"
              },
            ],
            "responses":{
              "200":{
                "description":"Delete a product"
              }
            }
          }
        }
    }
}