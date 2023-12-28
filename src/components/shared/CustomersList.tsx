const users = [
  {
    userId: "as!2",
    name: "Rishabh Prakash",
    phone: "9910503613",
    lastOrder1: "1234",
    lastOrder2: "1234",
    lastOrder3: "1234"
  },
  {
    userId: "as!2",
    name: "Satya Prakash",
    phone: "9910503613",
    lastOrder1: "1234",
    lastOrder2: "1234",
    lastOrder3: "1234"
  },
  {
    userId: "as!2",
    name: "Digant Prakash",
    phone: "9910503613",
    lastOrder1: "1234",
    lastOrder2: "1234",
    lastOrder3: "1234"
  },
  {
    userId: "as!2",
    name: "Ganesh Kumar",
    phone: "9910503613",
    lastOrder1: "1234",
    lastOrder2: "1234",
    lastOrder3: "1234"
  },
  {
    userId: "as!2",
    name: "Rishabh Prakash",
    phone: "9910503613",
    lastOrder1: "1234",
    lastOrder2: "1234",
    lastOrder3: "1234"
  },
];

type IUser = {
  userId: string;
  name: string;
  phone: string;
  lastOrder1: string;
  lastOrder2?: string;
  lastOrder3?: string;
};

const CustomersList = () => {
  return (
    <ul className="list w-full">
      <li className="list-element mb-2 py-2 rounded-none border-b-2 border-light-3">
        <p>User</p>
        <p>Phone No.</p>
        <p>Last</p>
        <p>Shop No.</p>
      </li>
      {users.map((user: IUser) => {
        return (
          <li className="list-element" key={user.userId}>
            <p>{user.name}</p>
            <p>{user.phone}</p>
            <p>{user.measurements}</p>
            <p>{user.shopNo}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default CustomersList;


// customer phone last_orderID(upto 4 wrt space available)