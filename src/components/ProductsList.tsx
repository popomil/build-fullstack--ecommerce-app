import { Container, Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import useAuthenticationQuery from "../hooks/useCusomHook";
import ProductSkeleton from "./ProductSkeleton";
import { IProduct } from "../interfaces";
import { useAppSelector } from "../app/hooks/hooks";

const ProductsList = () => {
  const { category } = useAppSelector(state => state.category);
  const { isOnline } = useAppSelector(state => state.network);
  const { data, isLoading } = useAuthenticationQuery({
    queryKey: ["data"],
    url: "/api/products?populate=*&sort=title",
  });
  const filteredProducts = data?.filter((product: IProduct) =>
    product.categories?.some(cat =>
      cat.title.toLowerCase() === category.toLowerCase()
    )
  );
  if (isLoading || !isOnline)
    return (
      <Container maxWidth="7xl" py={"12"} mt="50px">
        <Grid gridTemplateColumns="repeat(auto-fit,minmax(300px,1fr))" gap={"3"}>
          {Array.from({ length: 20 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </Grid>
      </Container>
    );

  return (
    <Container maxWidth="7xl" py={"12"}>
      <Grid gridTemplateColumns="repeat(auto-fit,minmax(300px,1fr))" gap={"3"}>
        {filteredProducts?.map((ele) => (
          <ProductCard product={ele} key={ele.id} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsList;
