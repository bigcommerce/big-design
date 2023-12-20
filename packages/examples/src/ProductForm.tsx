import { Box, Button, Form, FormGroup, H1, Input, Panel, Select } from '@bigcommerce/big-design';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { Product } from './data';

const initialValues: Product = {
  name: '',
  stock: 0,
  category: 'Food',
};

interface Props {
  onNewProduct(product: Product): void;
}

export const ProductForm: React.FC<Props> = ({ onNewProduct }) => {
  const onSubmit = (product: Product) => {
    onNewProduct(product);
    resetForm();
  };

  const { errors, handleChange, handleSubmit, resetForm, setFieldValue, touched, values } =
    useFormik<Product>({
      initialValues,
      onSubmit,
      validationSchema: ProductSchema,
    });

  return (
    <>
      <H1>Product Form</H1>
      <Panel>
        <Form noValidate onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              description="Quis veniam ullamco duis ipsum consequat aliqua irure."
              error={touched.name && errors.name}
              label="Name"
              name="name"
              onChange={handleChange}
              required
              value={values.name}
            />
          </FormGroup>
          <FormGroup>
            <Input
              description="Officia reprehenderit cillum Lorem eiusmod proident labore quis."
              error={touched.stock && errors.stock}
              label="Stock"
              name="stock"
              onChange={handleChange}
              required
              type="number"
              value={values.stock}
            />
          </FormGroup>

          <FormGroup>
            <Select
              error={touched.category && errors.category}
              label="Category"
              name="category"
              onOptionChange={(item) => setFieldValue('category', item)}
              options={[
                { content: 'Food', value: 'Food' },
                { content: 'Drink', value: 'Drink' },
              ]}
              required
              value={values.category}
            />
          </FormGroup>

          <Box marginTop="xxLarge">
            <Button type="submit">Submit</Button>
          </Box>
        </Form>
      </Panel>
    </>
  );
};

const ProductSchema = Yup.object().shape({
  name: Yup.string().min(2).max(50).required(),
  stock: Yup.number().required().min(0).max(100),
  category: Yup.string().required(),
});
