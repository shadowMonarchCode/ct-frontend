export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

// Measurements type
export type Shirt = {
  length: number;
  shoulder: number;
  sleeveLength: number;
  chest: number;
  waist: number;
  hip: number;
  neck: number;
  remark: string;
} | null;
export type Trouser = {
  length: number;
  crotch: number;
  waist: number;
  hip: number;
  thigh: number;
  knee: number;
  bottom: number;
  fLow: number;
  remark: string;
} | null;
export type Jacket = {
  length: number;
  shoulder: number;
  sleeveLength: number;
  chest: number;
  waist: number;
  hip: number;
  neck: number;
  crossBack: number;
  remark: string;
} | null;

// Partial customer details
export type Customer = {
  _id: string;
  name: string;
  phone: string;
};

// Partial order details
export type Order = {
  _id: string;
  order: string;
  status: string;
  dates: Dates;
  customer: Customer;
  products: Products[];
  bill: string;
  creator: Creator;
  shop: string;
};

// Partial creator details
export type Creator = {
  _id: string;
  name: string;
};

// Dates
export type Dates = {
  order: Date;
  trial: Date;
  delivery: Date;
  completion: Date | null;
  cancelled: Date | null;
};

// Products
export type Products = {
  type: string;
  amount: number;
};

// Measurements
export type Measurements = {
  shirt: Shirt | null;
  trouser: Trouser | null;
  jacket: Jacket | null;
};

// Full customer type
export type ICustomer = {
  _id: string;
  name: string;
  phone: string;
  orders: Order[];
  measurements: Measurements;
};

// Full order type
export type IOrder = {
  _id: string;
  order: string;
  status: string;
  dates: Dates;
  customer: Customer;
  products: Products[];
  measurements: Measurements;
  bill: string;
  creator: Creator;
  shop: string;
};

// Full User type
export type IUser = {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  orders: Order[];
  shops: string[];
};
