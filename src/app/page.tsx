"use client";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  Skeleton,
  Image,
} from "@nextui-org/react";
import { BsCart3 } from "react-icons/bs";

export interface Product {
  id: number;
  title: string;
  price: number;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [items, setItems] = useState<Product[]>([]);

  async function loadItems() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await api.get("/produtos");
      setItems(response.data);
      console.log("Success:", response);
    } catch (error) {
      console.log("Error:", error);
      alert("Ocorreu um erro ao tentar se conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  // Quando a tela for carregada, execute.
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="px-80 flex flex-col gap-5 mt-5">
      <p>numero de produtos: </p>

      <div className="flex items-center gap-2">
        <Input
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Digite o seu texto aqui..."
        />

        <Button color="primary">Enviar</Button>
      </div>

      {/* {loading && <p>Carregando...</p>} */}

      {loading && (
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      )}

      <ul className="gap-6 grid grid-cols-[repeat(auto-fill,min(200px))] justify-between">
        {items.map((item) => (
          <li key={item.id}>
            <Card
              shadow="sm"
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="object-cover h-[140px] w-[200px]"
                  src="https://picsum.photos/400/300"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.title}</b>
                <p className="text-default-500">{item.price}</p>
                <Button startContent={<BsCart3 />}>Comprar</Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
