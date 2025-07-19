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
import { useAppSelector } from "../app/hooks/hooks";

interface IProductFormData {
  title: string;
  description: string;
  price: number;
  stock: number;
}

const DashboardProductTable = () => {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [productToEdit, setProductToEdit] = useState<IProduct>();
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [newProductData, setNewProductData] = useState<IProductFormData>({
    title: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const {isOnline} =useAppSelector(state => state.network)
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null);
  // Hooks
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();;
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
  if (!productToEdit) return;
  const formData = new FormData();
  formData.append("data[title]", productToEdit.title);
  formData.append("data[description]", productToEdit.description);
  formData.append("data[price]", productToEdit.price.toString());
  formData.append("data[stock]", productToEdit.stock.toString());

  if (thumbnailImage) {
    formData.append("files.thumbnail", thumbnailImage);
  }

  try {
    await updateProduct({
      id: productToEdit.documentId,
      formBody: formData
    }).unwrap();
    
    closeEditModal();
    setThumbnailImage(null); 
  } catch (error) {
    console.error("Update error:", error);
    showToast("Failed to update product", "error");
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

  if (isLoading || !isOnline) return <TableSkelton />;

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
                    <Image
                      src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`}
                      alt={product.thumbnail.name || `Product ${product.id}`}
                      borderRadius="md"
                      width={"40px"}
                      height={"40px"}
                      rounded={"full"}
                    />
                  ) : (
                    <Image
                      src={"/download (18).jpeg"}
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