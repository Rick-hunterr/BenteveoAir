import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-5087822203100196-080318-8b802d28e73425e0e5c0ee411870b648-2603358870",
});

const preference = new Preference(client);

export async function paymentMercadopago(req: Request, res: Response) {
  const packages = req.body;
  
  // console.log(req.body[0].name);
  // packages.forEach(($package: {name: String, price: Number}) => {
  //   const { name, price } = $package;
  //   console.log(name);
  //   console.log(price);
  // });

  // if (!product.titulo || !product.precio || !product.cantidad) {
  //   return res
  //     .status(400)
  //     .json({ error: "El producto debe tener titulo, precio y cantidad" });
  // }

  // res.status(201).json(product); // Si no tiene respuesta alguna, entonces el fetch obtendra un error al no obtener respuesta por parte del servidor

  try {
    const items: {
      id: string;
      title: string;
      unit_price: number;
      quantity: number;
    }[] = [];

    packages.forEach(($package: { name: string; price: number }) => {
      const { name, price } = $package;

      items.push({
        id: "1",
        title: name,
        unit_price: price,
        quantity: 1,
      });
    });

    const paymentResponse = await preference.create({
      body: {
        items: items,
        // items: [
        //   {
        //     id: "1",
        //     title: "Titulo",
        //     unit_price: 1000,
        //     quantity: 1,
        //   },
        // ],
        back_urls: {
          success: "https://c0dea736e7ce.ngrok-free.app", // No contamos con un dominio que utilice el protocolo HTTPS
          failure: "https://c0dea736e7ce.ngrok-free.app", 
          pending: "https://c0dea736e7ce.ngrok-free.app", 
        },
        auto_return: "approved",
      },
    });

    res.status(201).json(paymentResponse);
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).json({ error: "No se pudo crear la preferencia" });
  }
}
