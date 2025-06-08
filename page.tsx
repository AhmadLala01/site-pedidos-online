
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const menu = [{ category: "Exemplo", items: [{ name: "Pizza Margherita", price: 950, image: "/images/pizza.jpg" }] }];

let orderHistory = [];

export default function OnlineOrders() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [history, setHistory] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleCheckout = () => {
    const order = {
      name,
      phone,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toLocaleString(),
    };
    orderHistory.push(order);
    setHistory([...orderHistory]);

    const orderText = `🛒 *Novo Pedido Online*\n\n` +
      cart.map((item, i) => `• ${item.name} - ${item.price}MT`).join("\n") +
      `\n\n👤 *Nome:* ${name}\n📞 *Telefone:* ${phone}`;

    const whatsappLink = `https://wa.me/258841306666?text=${encodeURIComponent(orderText)}`;
    window.open(whatsappLink, "_blank");

    setCart([]);
    setName("");
    setPhone("");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Pedidos Online</h1>
      {history.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">🧾 Histórico de Pedidos</h2>
          <ul className="space-y-2">
            {history.map((order, index) => (
              <li key={index} className="border p-3 rounded shadow-sm">
                <p className="font-semibold">{order.name} ({order.phone})</p>
                <p className="text-sm text-gray-500">{order.date}</p>
                <ul className="text-sm list-disc ml-5">
                  {order.items.map((item, i) => (
                    <li key={i}>{item.name} - {item.price} MT</li>
                  ))}
                </ul>
                <p className="font-bold mt-1">Total: {order.total} MT</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Tabs defaultValue={menu[0].category} className="category">
        <TabsList className="grid grid-cols-3 mb-4">
          {menu.map((section) => (
            <TabsTrigger key={section.category} value={section.category}>
              {section.category}
            </TabsTrigger>
          ))}
        </TabsList>
        {menu.map((section) => (
          <TabsContent key={section.category} value={section.category}>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {section.items.map((item, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
                  <CardContent className="py-4 px-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-lg">{item.name}</p>
                        <p className="text-sm text-gray-500">{section.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{item.price} MT</p>
                        <Button size="sm" onClick={() => addToCart(item)}>Adicionar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-md">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Seu telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold">Itens no Carrinho: {cart.length}</p>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleCheckout} disabled={!name || !phone}>
                Finalizar Pedido via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
