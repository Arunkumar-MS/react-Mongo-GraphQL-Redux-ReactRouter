import mongoose from 'mongoose';
import {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLInt
} from 'graphql';
const Schema = mongoose.Schema

// Mongoose Schema definition
const PRODUCT = mongoose.model('Product', new Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  url: String,
  price: Number,
  quantity: Number,
  discription: String
}))
//#################################

//Mongoose connection
const COMPOSE_URI_DEFAULT = 'mongodb://arun:arun123@ds139619.mlab.com:39619/reactmongo';
const connectionOptions = {
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectionTimeout: 0
    }
  }
};
mongoose.connect(COMPOSE_URI_DEFAULT, connectionOptions,  function (error) {
  if (error) console.error(error)
  else console.log('mongo connected')
})
const conn = mongoose.connection;             
conn.on('error', console.error.bind(console, 'connection error:'));
//#################################

//Type definition
const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'Product id'
    },
    title: {
      type: GraphQLString,
      description: 'Product title'
    },
    url: {
      type: GraphQLString,
      description: 'Product image URL'
    },
    quantity: {
      type: GraphQLInt,
      description: 'Product quantity'
    },
    price: {
      type: GraphQLInt,
      description: 'Product price'
    },
    discription: {
      type: GraphQLString,
      description: 'Product discription'
    }
  })
})
//#################################

//GraphQL Query definition
const getProductsById = {
    type: new GraphQLList(ProductType),
    args: {
        id: {
            name: 'product Id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return new Promise((resolve, reject) => {
            PRODUCT.findById(args.id, (err, product) => {
              let prod = [];
              prod.push(product);
              resolve(prod);
            });
        });
    }
};

const promiseListAll = () => {
  return new Promise((resolve, reject) => {
    PRODUCT.find((err, Products) => {
      if (err) reject(err)
      else resolve(Products)
    })
  })
}
// Consolidated Querys
const Products = {
  type: new GraphQLList(ProductType),
  resolve: () => {
    return promiseListAll()
  }
};

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        Products: Products,
        GetProductsById: getProductsById
    }

});
//#################################

//GraphQL Mutation definition

const MutationAdd = {
  type: ProductType,
  description: 'Add a Product',
  args: {
    title: {
      name: 'Product title',
      type: new GraphQLNonNull(GraphQLString)
    },
    url: {
      name: 'Product image URL',
      type: new GraphQLNonNull(GraphQLString)
    },
    quantity: {
      name: 'Product quantity',
      type: new GraphQLNonNull(GraphQLInt)
    },
    price: {
      name: 'Product price',
      type: new GraphQLNonNull(GraphQLInt)
    },
    discription: {
      name: 'Product discription',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args) => {
    let product = new PRODUCT({
      title: args.title,
      url: args.url,
      quantity: args.quantity,
      price: args.price,
      discription: args.discription
    })
    product.id = product._id
    return new Promise((resolve, reject) => {
      product.save(function (err) {
        if (err) reject(err)
        else resolve(product)
      })
    })
  }
}

const MutationDelete = {
  type: ProductType,
  description: 'Destroy the ProductType',
  args: {
    id: {
      name: 'product Id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      PRODUCT.findById(args.id, (err, product) => {
        if (err) {
          reject(err)
        } else if (!product) {
          reject('product NOT found')
        } else {
          product.remove((err) => {
            if (err) reject(err)
            else resolve(product)
          })
        }
      })
    })
  }
}

const MutationSave = {
  type: ProductType,
  description: 'Edit a Product',
  args: {
    id: {
      name: 'Product Id',
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      name: 'Product title',
      type: new GraphQLNonNull(GraphQLString)
    },
    url: {
        name: 'Product image URL',
        type: new GraphQLNonNull(GraphQLString)
      },
    quantity: {
        name: 'Product quantity',
        type: new GraphQLNonNull(GraphQLInt)
      },
    price: {
        name: 'Product price',
        type: new GraphQLNonNull(GraphQLInt)
      },
    discription: {
        name: 'Product discription',
        type: new GraphQLNonNull(GraphQLString)
      }
  },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      PRODUCT.findById(args.id, (err, product) => {
        if (err) {
          reject(err)
          return
        }

        if (!product) {
          reject('product NOT found')
          return
        }
        product.title = args.title;
        product.url = args.url;
        product.quantity = args.quantity;
        product.price = args.price;
        product.discription = args.discription;
        product.save((err) => {
          if (err) reject(err)
          else resolve(product)
        })
      })
    })
  }
}


// Consolidated Mutation Type

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd,
    delete: MutationDelete,
    save: MutationSave
  }
})
//#################################

// Expose all supported Schema

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})
