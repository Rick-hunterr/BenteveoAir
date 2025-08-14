import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-5087822203100196-080318-8b802d28e73425e0e5c0ee411870b648-2603358870",
});

const preference = new Preference(client);

export async function paymentMercadopago(req: Request, res: Response) {
  const packages = req.body;

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
        back_urls: {
          success: "https://033fcfca19db.ngrok-free.app", // No contamos con un dominio que utilice el protocolo HTTPS
          failure: "https://033fcfca19db.ngrok-free.app", 
          pending: "https://033fcfca19db.ngrok-free.app", 
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
