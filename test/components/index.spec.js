import { App } from '../../components/app';

describe('<App />', () => {
  let props;
  beforeEach(() => {
    props = {
      products: 
       [
        {
          "id": "5945ca3cfb7fe7000460e0da",
          "title": "New opne",
          "quantity": 3,
          "price": 12
        },
        {
          "id": "589a01417fbb7f00111d0892",
          "title": "Broccoli",
          "quantity": 5000,
          "price": 100
        },
        {
          "id": "58bef54b4a4b4e0004112d7c",
          "title": "Wine",
          "quantity": 20,
          "price": 1000
        },
        {
          "id": "58bef5c44a4b4e0004112d7d",
          "title": "Military backpack",
          "quantity": 200,
          "price": 2000
        },
        {
          "id": "5941942400dc660004acd152",
          "title": "Product Title",
          "quantity": 123123,
          "price": 121
        }
      ]
    }
  });
  test('should render App Component', () => {
    const component = shallow(<App { ...props }/>);
    expect(component).toMatchSnapshot();
  });
});
