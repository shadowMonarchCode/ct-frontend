import { Jacket, Measurements, Order, Products, Shirt, Trouser } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("en-US", options).format(newDate);
};

export const orderClassification = (orders: Order[]) => {
  let trial = 0;
  let delivery = 0;
  let completed = 0;
  let pending = 0;
  let cancelled = 0;

  orders.map(({ status }) => {
    if (status === "Trial") trial++;
    else if (status === "Delivery") delivery++;
    else if (status === "Pending") pending++;
    else if (status === "Completed") completed++;
    else if (status === "Cancelled") cancelled++;
  });

  return [pending, trial, delivery, completed, cancelled];
};

type ProdObj = {
  kurta: string;
  pajama: string;
  trouser: string;
  jacket: string;
  shirt: string;
  vestCoat: string;
  jawarBundi: string;
  tuxedo: string;
  sherwani: string;
  suit2: string;
  suit3: string;
};

const ProductsKeys = {
  kurta: "Kurta",
  pajama: "Pajama",
  trouser: "Trouser",
  jacket: "Jacket",
  shirt: "Shirt",
  vestCoat: "Vest Coat",
  jawarBundi: "Jawar Bundi",
  tuxedo: "Tuxedo",
  sherwani: "Sherwani",
  suit2: "Suit 2pc",
  suit3: "Suit 3pc",
};
export const updateProducts = (productObj: ProdObj) => {
  const products: Products[] = Object.entries(productObj)
    .filter((product) => Number(product[1]) > 0)
    .map(([type, amount]) => ({
      type: ProductsKeys[type as string],
      amount: Number(amount),
    }));
  return products;
};

interface Measurement {
  shirt: {
    length: string;
    shoulder: string;
    sleeveLength: string;
    chest: string;
    waist: string;
    hip: string;
    neck: string;
    remark: string;
  };
  trouser: {
    length: string;
    crotch: string;
    waist: string;
    hip: string;
    thigh: string;
    knee: string;
    bottom: string;
    fLow: string;
    remark: string;
  };
  jacket: {
    length: string;
    shoulder: string;
    sleeveLength: string;
    chest: string;
    waist: string;
    hip: string;
    neck: string;
    crossBack: string;
    remark: string;
  };
}

export function convertToMeasurements(measurement: Measurement): Measurements {
  const shirt = convertToShirt(measurement.shirt);
  const trouser = convertToTrouser(measurement.trouser);
  const jacket = convertToJacket(measurement.jacket);

  return { shirt, trouser, jacket };
}

function convertToShirt(shirt: Measurement["shirt"]): Shirt {
  const isEmpty = Object.values(shirt).every((value) => value === "");

  const values = {
    length: parseFloat(shirt.length),
    shoulder: parseFloat(shirt.shoulder),
    sleeveLength: parseFloat(shirt.sleeveLength),
    chest: parseFloat(shirt.chest),
    waist: parseFloat(shirt.waist),
    hip: parseFloat(shirt.hip),
    neck: parseFloat(shirt.neck),
    remark: shirt.remark,
  };

  return isEmpty ? null : values;
}

function convertToTrouser(trouser: Measurement["trouser"]): Trouser {
  const isEmpty = Object.values(trouser).every((value) => value === "");

  const values = {
    length: parseFloat(trouser.length),
    crotch: parseFloat(trouser.crotch),
    waist: parseFloat(trouser.waist),
    hip: parseFloat(trouser.hip),
    thigh: parseFloat(trouser.thigh),
    knee: parseFloat(trouser.knee),
    bottom: parseFloat(trouser.bottom),
    fLow: parseFloat(trouser.fLow),
    remark: trouser.remark,
  };

  return isEmpty ? null : values;
}

function convertToJacket(jacket: Measurement["jacket"]): Jacket {
  const isEmpty = Object.values(jacket).every((value) => value === "");

  const values = {
    length: parseFloat(jacket.length),
    shoulder: parseFloat(jacket.shoulder),
    sleeveLength: parseFloat(jacket.sleeveLength),
    chest: parseFloat(jacket.chest),
    waist: parseFloat(jacket.waist),
    hip: parseFloat(jacket.hip),
    neck: parseFloat(jacket.neck),
    crossBack: parseFloat(jacket.crossBack),
    remark: jacket.remark,
  };

  return isEmpty ? null : values;
}

export const showMeasurementsForm = (products: Products[]) => {
  const shirtType = ["kurta", "shirt"];
  const trouserType = ["pajama", "trouser", "tuxedo", "suit2", "suit3"];
  const jacketType = [
    "jacket",
    "vestCoat",
    "jawarBundi",
    "tuxedo",
    "sherwani",
    "suit2",
    "suit3",
  ];
  const showShirt = products.some((product) =>
    shirtType.includes(product.type)
  );
  const showTrouser = products.some((product) =>
    trouserType.includes(product.type)
  );
  const showJacket = products.some((product) =>
    jacketType.includes(product.type)
  );

  return { showShirt, showTrouser, showJacket };
};
