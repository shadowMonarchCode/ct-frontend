import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  cn,
  convertToMeasurements,
  // showMeasurementsForm,
  updateProducts,
} from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  jacketMeasurements,
  products,
  shirtMeasurements,
  trouserMeasurements,
} from "@/constants";
import { Textarea } from "../ui/textarea";
import { createOrder } from "@/lib/api";
import { useUserContext } from "@/context/AuthContext";
import { OrderValidation } from "@/lib/validation";

interface OrderFormProps {
  action: "Create" | "Update";
}

export const OrderForm = ({ action }: OrderFormProps) => {
  const { user } = useUserContext();

  const form = useForm<z.infer<typeof OrderValidation>>({
    resolver: zodResolver(OrderValidation),
    defaultValues: {
      order: "",
      dates: {
        order: new Date(),
        trial: new Date(),
        delivery: new Date(),
      },
      name: "",
      phone: "",
      products: [],
      productObj: {
        jacket: "0",
        jawarBundi: "0",
        kurta: "0",
        pajama: "0",
        sherwani: "0",
        shirt: "0",
        suit2: "0",
        suit3: "0",
        trouser: "0",
        tuxedo: "0",
        vestCoat: "0",
      },
      measurements: {
        shirt: {
          chest: "",
          hip: "",
          length: "",
          neck: "",
          remark: "",
          shoulder: "",
          sleeveLength: "",
          waist: "",
        },
        trouser: {
          length: "",
          crotch: "",
          waist: "",
          hip: "",
          thigh: "",
          knee: "",
          bottom: "",
          fLow: "",
          remark: "",
        },
        jacket: {
          length: "",
          shoulder: "",
          sleeveLength: "",
          chest: "",
          waist: "",
          hip: "",
          neck: "",
          crossBack: "",
          remark: "",
        },
      },
    },
  });

  async function onSubmit(data: z.infer<typeof OrderValidation>) {
    data.products = updateProducts(data.productObj);

    const formData = {
      order: data.order,
      dates: {
        order: data.dates.order,
        trial: data.dates.trial,
        delivery: data.dates.delivery,
        completion: null,
        cancelled: null,
      },
      name: data.name,
      phone: data.phone,
      products: data.products,
      status: "Pending",
      shop: user.shops[0],
      measurements: convertToMeasurements(data.measurements),
    };
    try {
      const response = await createOrder(formData);
      toast({
        title: response.message,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-8"
      >
        {/* Order ID */}
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Id</FormLabel>
              <FormControl>
                <Input
                  placeholder="Order ID"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-primary-red" />
            </FormItem>
          )}
        />
        {/* Customer Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Customer Name"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-primary-red" />
            </FormItem>
          )}
        />
        {/* Customer Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone No.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Phone No."
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-primary-red" />
            </FormItem>
          )}
        />
        {/* Order Date */}
        <FormField
          control={form.control}
          name="dates.order"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Order Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Trial Date */}
        <FormField
          control={form.control}
          name="dates.trial"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Trial Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date("2100-12-31") ||
                      date < form.watch("dates.order")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-primary-red" />
            </FormItem>
          )}
        />
        {/* Delivery Date */}
        <FormField
          control={form.control}
          name="dates.delivery"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Delivery Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date("2100-12-31") ||
                      date < form.watch("dates.order")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-primary-red" />{" "}
            </FormItem>
          )}
        />
        {/* //TODO: Change layout, Use Accordian */}
        {/* Products */}
        <div className="border-2 border-light-4 p-2 rounded-lg">
          <p className="w-full text-center pb-2">Products</p>
          <div className="flex flex-col gap-1 lg:w-4/5">
            {products.map((product) => (
              <FormField
                key={product.id}
                control={form.control}
                name={product.id}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={product.id}
                      className="flex items-center gap-4 justify-between pl-4"
                    >
                      <FormLabel className="text-sm font-normal">
                        {product.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          step={1}
                          placeholder="Qty."
                          className="w-[80px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div>

        {/* Measurements */}
        {/* Shirt Measurements */}
        <div className="border-2 border-light-4 p-2 rounded-lg">
          <p className="w-full text-center">Shirt</p>
          <div className="grid grid-cols-2 gap-3">
            {shirtMeasurements.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id}
                render={({ field }) => (
                  <FormItem className="last:col-start-1 last:col-span-full">
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      {item.label !== "Remark" ? (
                        <Input
                          placeholder="0.0"
                          className="shad-input"
                          type="number"
                          min={0}
                          step={0.25}
                          {...field}
                        />
                      ) : (
                        <Textarea
                          placeholder="Anything else..."
                          className="resize-y"
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage className="text-primary-red" />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        {/* Trouser Measurements */}
        <div className="border-2 border-light-4 p-2 rounded-lg">
          <p className="w-full text-center">Trouser</p>
          <div className="grid grid-cols-2 gap-3">
            {trouserMeasurements.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id}
                render={({ field }) => (
                  <FormItem className="last:col-start-1 last:col-span-full">
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      {item.label !== "Remark" ? (
                        <Input
                          placeholder="0.0"
                          className="shad-input"
                          type="number"
                          min={0}
                          step={0.25}
                          {...field}
                        />
                      ) : (
                        <Textarea
                          placeholder="Anything else..."
                          className="resize-y"
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage className="text-primary-red" />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        {/* Jacket Measurements */}
        <div className="border-2 border-light-4 p-2 rounded-lg">
          <p className="w-full text-center">Jacket</p>
          <div className="grid grid-cols-2 gap-3">
            {jacketMeasurements.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id}
                render={({ field }) => (
                  <FormItem className="last:col-start-1 last:col-span-full">
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      {item.label !== "Remark" ? (
                        <Input
                          placeholder="0.0"
                          className="shad-input"
                          type="number"
                          min={0}
                          step={0.25}
                          {...field}
                        />
                      ) : (
                        <Textarea
                          placeholder="Anything else..."
                          className="resize-y"
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage className="text-primary-red" />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* Button */}
        <Button type="submit" className="shad-button_primary">
          {action}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;
