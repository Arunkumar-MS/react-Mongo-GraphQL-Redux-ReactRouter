
export const editProduct = `
mutation edit($id: String!, $title: String!, $url: String!, $discription: String!, $price: Int!, $quantity: Int!){
  save(id: $id ,title: $title, url: $url, discription: $discription, price: $price, quantity: $quantity ) {
   	id,
    title,
    url,
    discription,
    price,
    quantity
  }
}
`;

export const getProducts = `
query {
  Products {
    id,
    title,
    quantity,
    price
  }
}
`;


export const productsById =`
query GetProductsById($id: String!){
  GetProductsById(id: $id) {
    id,
    title,
    quantity,
    price,
    url,
    discription

  }
}`;

export const deleteProducts =`
mutation delete ($id: String!){
  delete(id: $id){
    id
  }
}
`;

export const addProduct =`
mutation add($title: String!, $url: String!, $discription: String!, $price: Int!, $quantity: Int!){
  add(title: $title, url: $url, discription: $discription, price: $price, quantity: $quantity ) {
    title,
    url,
    discription,
    price,
    quantity
  }
}
`;
