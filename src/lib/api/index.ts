import { Order, IUser, Products, Measurements, Dates, IOrder } from "@/types";

// Define an interface for the response data
interface LoginResponse {
  token: string;
}

interface LoginData {
  username: string;
  password: string;
}

const API_URL = "https://ct-api.onrender.com";
// const LOCAL_URL = "http://localhost:3000";

const token = localStorage.getItem("jwtToken") || "";

export const login = async (data: LoginData): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    if (response.ok) {
      const { token }: LoginResponse = await response.json();
      localStorage.setItem("jwtToken", token);
    } else {
      const errorData = await response.json();
      console.log(`Login failed: ${errorData.error}`);
    }
  } catch (error) {
    console.log("Error during login:", error);
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    localStorage.removeItem("jwtToken");
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
};

export const getAllUsers = async (): Promise<IUser[] | null> => {
  try {
    if (!token) {
      console.error("JWT token is missing.");
      return null;
    }
    const response = await fetch(`${API_URL}/user/get-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.ok) {
      const users: IUser[] = await response.json();
      return users;
    } else {
      // Handle unsuccessful request
      console.error(`Failed to get users: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};

export const getMyProfile = async (): Promise<IUser | null> => {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      // console.error("JWT token is missing.");
      return null;
    }

    const response = await fetch(`${API_URL}/user/`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      const user: IUser = await response.json();
      return user;
    } else {
      // Handle unsuccessful request
      console.error(`Failed to get user: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};

export const getOrdersByShop = async (
  shops: string[]
): Promise<Order[] | null> => {
  try {
    if (!token) {
      console.error("JWT token is missing.");
      return null;
    }
    if (shops.length === 0) return null;
    const response = await fetch(`${API_URL}/order/shop/`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      const orders: Order[] = await response.json();
      return orders;
    }
    console.log(response.status);
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

interface NewOrder {
  order: string;
  status: string;
  name: string;
  phone: string;
  products: Products[];
  measurements: Measurements;
  shop: string;
  dates: Dates;
}

interface CreateOrderResponse {
  success: boolean;
  message: string;
}
export const createOrder = async (
  data: NewOrder
): Promise<CreateOrderResponse> => {
  try {
    if (!token) {
      console.error("JWT token is missing.");
      return {
        success: false,
        message: "You have to login again before creating an order.",
      };
    }
    // console.log(data);
    const response = await fetch(`${API_URL}/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        order: data.order,
        dates: {
          order: data.dates.order,
          trial: data.dates.trial,
          delivery: data.dates.delivery,
          completion: null,
          cancellation: null,
        },
        name: data.name,
        phone: data.phone,
        products: data.products,
        status: "Pending",
        shop: data.shop,
        measurements: data.measurements,
      }),
    });
    if (response.ok) {
      return {
        success: true,
        message: "New order has been created.",
      };
    }
    return {
      success: false,
      message: "There is an issue. Please try again later.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "There is an issue. Please try again later.",
    };
  }
};

export const getOrderById = async (orderId: string): Promise<IOrder | null> => {
  try {
    if (!token) {
      console.error("JWT token is missing.");
      return null;
    }
    const response = await fetch(`${API_URL}/order/get/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      const order: IOrder = await response.json();
      return order;
    } else {
      console.error(`Failed to get users: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};
