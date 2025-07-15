import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  Flex
} from "@chakra-ui/react";
import { sliceText } from "../utils";
import { useEffect, useState, type ChangeEvent } from "react";
import TableSkelton from "./TableSkelton";
import { MdDelete, MdEdit, MdPreview } from "react-icons/md";
import { onOpenDialogAction } from "../app/feature/global/globalSlice";
import Dialog from "./ui/Dialog";
import { useAppDispatch } from "../app/store";
import {
  useCreateDashboardProductMutation,
  useDeleteDashboardProductMutation,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductMutation,
} from "../app/feature/services/apiSlice";
import type { ICategory, IProduct } from "../interfaces";
import CustomModal from "./ui/CustomModal";
import { useNavigate } from "react-router-dom";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

interface IProductFormData {
  title: string;
  description: string;
  price: number;
  stock: number;
}

const DashboardProductTable = () => {
  // State management
  const [selectedProductId, setSelectedProductId] = useState("");
  const [productToEdit, setProductToEdit] = useState<IProduct>();
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [newProductData, setNewProductData] = useState<IProductFormData>({
    title: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null);

  // Hooks
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Modal controls
  const {
    isOpen: isEditModalOpen,
    onOpen: openEditModal,
    onClose: closeEditModal
  } = useDisclosure();

  const {
    isOpen: isAddModalOpen,
    onOpen: openAddModal,
    onClose: closeAddModal
  } = useDisclosure();

  // API calls
  const { data: productsData, isLoading } = useGetDashboardProductsQuery({});
  const [deleteProduct, { isLoading: isDeleting, isSuccess: deleteSuccess }] =
    useDeleteDashboardProductMutation();
  const [updateProduct, { isSuccess: updateSuccess }] = useUpdateDashboardProductMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateDashboardProductMutation();

  // Effects
  useEffect(() => {
    if (deleteSuccess) {
      setSelectedProductId("");
      showToast("Product deleted", "success");
    }
    if (updateSuccess) {
      closeEditModal();
      showToast("Product updated", "success");
    }
  }, [deleteSuccess, updateSuccess, closeEditModal]);

  // Helper functions
  const showToast = (title: string, status: "success" | "error") => {
    toast({
      title,
      status,
      duration: 3000,
      isClosable: true,
    });
  };
  const creativePlaceholder = "data:image/jpeg;base64,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";
  // Handlers
  const handleAddProductInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewProductData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setNewThumbnail(e.target.files[0]);
    }
  };

  const handleEditProductInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (productToEdit) {
      setProductToEdit({ ...productToEdit, [name]: value });
    }
  };

  const handlePriceChange = (value: string) => {
    if (productToEdit) {
      setProductToEdit({ ...productToEdit, price: +value });
    }
  };

  const handleStockChange = (value: string) => {
    if (productToEdit) {
      setProductToEdit({ ...productToEdit, stock: +value });
    }
  };

  const handleEditThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setThumbnailImage(e.target.files[0]);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("data[title]", newProductData.title);
    formData.append("data[description]", newProductData.description);
    formData.append("data[price]", newProductData.price.toString());
    formData.append("data[stock]", newProductData.stock.toString());

    if (newThumbnail) {
      formData.append("files.thumbnail", newThumbnail);
    }

    try {
      await createProduct(formData).unwrap();
      showToast("Product created", "success");
      closeAddModal();
      resetProductForm();
    } catch (error) {
      showToast("Error creating product", "error");
      console.error("Creation error:", error);
    }
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("data[title]", `${productToEdit?.title}`);
    formData.append("data[price]", `${productToEdit?.price}`);
    formData.append("data[stock]", `${productToEdit?.stock}`);

    if (thumbnailImage) {
      formData.append("files.thumbnail", thumbnailImage);
    }

    try {
      await updateProduct({
        id: productToEdit?.documentId,
        formBody: formData
      }).unwrap();
      closeEditModal();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDeleteProduct = () => {
    deleteProduct(selectedProductId);
  };

  const resetProductForm = () => {
    setNewProductData({
      title: "",
      description: "",
      price: 0,
      stock: 0,
    });
    setNewThumbnail(null);
  };

  const openDeleteDialog = (productId: string) => {
    setSelectedProductId(productId);
    dispatch(onOpenDialogAction());
  };

  if (isLoading) return <TableSkelton />;

  return (
    <>
      <TableContainer w={"90%"} mx={"auto"}>
        <Flex justify="space-between" mb={4}>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={openAddModal}
          >
            Create Product
          </Button>

          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            variant="outline"
          >
            Delete All Products
          </Button>
        </Flex>
        <CustomModal
          onSubmit={handleCreateProduct}
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          title="Add Product"
          isLoading={isCreating}
        >
          <FormControl my={4} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={newProductData.title}
              onChange={handleAddProductInputChange}
              placeholder="Product Title"
            />
          </FormControl>

          <FormControl my={4}>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={newProductData.description}
              onChange={handleAddProductInputChange}
              placeholder="Product Description"
            />
          </FormControl>

          <FormControl my={4} isRequired>
            <FormLabel>Price</FormLabel>
            <NumberInput
              value={newProductData.price}
              onChange={(value) => setNewProductData({
                ...newProductData,
                price: parseFloat(value) || 0
              })}
              min={0}
              precision={2}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl my={4} isRequired>
            <FormLabel>Stock</FormLabel>
            <NumberInput
              value={newProductData.stock}
              onChange={(value) => setNewProductData({
                ...newProductData,
                stock: parseInt(value) || 0
              })}
              min={0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Thumbnail</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
          </FormControl>
        </CustomModal>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Thumbnail</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody textAlign={"center"}>
<<<<<<< HEAD
            {productsData?.data?.map((product: IProduct) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{sliceText(product.title, 10)}</Td>
                <Td>
                  {product.categories.length > 0 ? (product.categories.map((cat: ICategory) => (
                    <Text key={cat.id}>{cat.title}</Text>))) : (<Text >Headphones</Text>)
                  }
                </Td>
                <Td>
                  {product.thumbnail?.url ? (
=======
            {data.data &&
              data?.data?.map((ele: IProduct) => (
                <Tr key={ele.id}>
                  <Td>{ele.id}</Td>
                  <Td>{sliceText(ele.title, 10)}</Td>
                  <Td>{ele.categories[0].title}</Td>
                  <Td>
>>>>>>> parent of 3046058 (Finish the project.✅)
                    <Image
                      src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`}
                      alt={product.thumbnail.name || `Product ${product.id}`}
                      borderRadius="md"
                      width={"40px"}
                      height={"40px"}
                      rounded={"full"}
                      fallbackSrc={creativePlaceholder} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = creativePlaceholder;
                      }}
                    />
                  ) : (
                    <Image
                      src={creativePlaceholder}
                      alt="Creative placeholder"
                      borderRadius="md"
                      width={"40px"}
                      height={"40px"}
                      rounded={"full"}
                    />
                  )}
                </Td>
                <Td>{product.price}</Td>
                <Td>{product.stock}</Td>
                <Td>
                  <Button
                    onClick={() => navigate(`/product/${product.documentId}`)}
                    colorScheme="green"
                  >
                    <MdPreview />
                  </Button>
                  <Button
                    onClick={() => openDeleteDialog(product.documentId)}
                    mx={2}
                    colorScheme="red"
                  >
                    <MdDelete />
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      setProductToEdit(product);
                      openEditModal();
                    }}
                  >
                    <MdEdit />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Dialog
        isLoading={isDeleting}
        body="Are you sure you want to delete this product? This action cannot be undone."
        title="Delete Product"
        className="text-red-500"
        onDeleteHandler={handleDeleteProduct}
      />

      <CustomModal
        onSubmit={handleUpdateProduct}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Update Product"
        isLoading={isCreating}
      >
        <FormControl my={4}>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            onChange={handleEditProductInputChange}
            value={productToEdit?.title}
            placeholder="Product Title"
          />
        </FormControl>
        <FormControl my={4}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            onChange={handlePriceChange}
            value={productToEdit?.price}
            step={1}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={4}>
          <FormLabel>Stock</FormLabel>
          <NumberInput
            value={productToEdit?.stock}
            onChange={handleStockChange}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleEditThumbnailChange}
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default DashboardProductTable;