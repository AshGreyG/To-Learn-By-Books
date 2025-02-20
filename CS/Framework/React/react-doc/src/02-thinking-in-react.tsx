import React, { useState } from "react";

// 1. First you will break the user interface apart into pieces
//    called *components*;
// 2. Then you will describe the different visual states for
//    each of your components;
// 3. Finally, you will connect your components together so that
//    the data flows through of them.

// Step 1: Break the UI into a component hierarchy

// Single responsibility principle: a component should ideally only
// do one thing. If it ends up growing, it should be decomposed into
// smaller sub-components.

// 1. 'FilterableProductTable' contains the entire app;
// 2. 'SearchBar' receives the user input;
// 3. 'ProductTable' displays and filters the list according to the
//    user input;
// 4. 'ProductCategoryRow' displays a heading for each category;
// 5. 'ProductRow' displays a row for each product.

// + FilterableProductTable
//   + SearchBar
//   + ProductTable
//     + ProductCategoryRow
//     + ProductRow

// Step 2: Build a static version in React

// Step 3: Find the minimal but complete representation of UI state

// Think of state as the minimal set of changing data that your app
// needs to remember. The most important principle for structuring state
// is to keep it DRY (Don't Repeat Yourself).

// + Does it remain unchanged over time? If so, it isn't state;
// + Is it passed in from a parent via props? If so, it isn't state;
// + Can you compute it based on existing state or props in your
//   component? If so, it isn't state.

// 1❎. The original list of products;
//      The original list of products is passed in as props, so it's not state.
// 2✅. The search text the user has entered;
//      It changes over time and can't be computed from anything, so it's state.
// 3✅. The value of the checkbox;
//      It seems to be state since it changes over time and can't be computed
//      from anything.
// 4❎. The filtered list of products;
//      It can be computed by taking the original list of products and filtering 
//      it according to the search text and value of the checkbox.

// There are two types of "model" data in React: props and state. The two are
// very different:
//   + Props are like arguments you pass to a function. They let a parent
//     component pass data to a child component and customize its appearance.
//   + Strate is like a component's memory. It les a component keep track of
//     some information and change it in response to interactions.

// Step 4: Identify where your state should live

// After identifying your app's minimal state data, you need to identify which
// component is responsible for changing this state, or owns the state. React
// uses one-way data flow, passing data down the component hierarchy from parent
// to child component.

// 1. Identify every component that renders something based on that state.
// 2. Find their closet common parent component - a component above them all
//    in the hierarchy.
// 3. Decide where the state should live:
//    1. Often, you can put the state directly into their common parent.
//    2. You can also put the state into some component above their common
//       parent.
//    3. If you can't find a component where it makes sense to own the state,
//       create a new component solely for holding the state and add it some-
//       where in the hierarchy above the common parent component.

interface Product {
  category: 
    | "Fruits"
    | "Vegetables";
  price: string;
  stocked: boolean;
  name: string;
}

interface ProductRowPropType {
  product: Product;
}

function ProductRow(prop: ProductRowPropType) {
  const name: React.JSX.Element | string = prop.product.stocked ? prop.product.name :
    <span style={{ color: "red" }}>
      {prop.product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{prop.product.price}</td>
    </tr>
  )
}

interface ProductCategoryRowPropType {
  category:
    | "Fruits"
    | "Vegetables";
}

function ProductCategoryRow(prop: ProductCategoryRowPropType) {
  return (
    <tr>
      <th colSpan={2}>
        {prop.category}
      </th>
    </tr>
  )
}

interface ProductTablePropType {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}

function ProductTable(prop: ProductTablePropType) {

  // 'ProductTable' needs to filter the product list based on that state
  // search text and checkbox value

  // The first parent component both 'ProductTable' and 'SearchBar' share
  // is 'FilterableProductTable'

  // To change the state according to user input, you will need to support
  // data flowing the other way: the form components deep in the hierarchy
  // need to update the state in 'FilterProductTable'

  const rows: React.JSX.Element[] = [];
  let lastCategory:
    | "Fruits"
    | "Vegetables"
    | null
    = null;

  prop.products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        prop.filterText.toLowerCase()
      ) === - 1
    ) {
      // Filter the product whose name is equal to 'filterText'
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow 
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(
      <ProductRow 
        product={product}
        key={product.name}
      />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

interface SearchBarPropType {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: React.Dispatch<React.SetStateAction<string>>;
  onInStockOnlyChange: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchBar(prop: SearchBarPropType) {

  // 'SearchBar' needs to display that state, search text and checkbox value
  // Inside the 'SearchBar', you will add the 'onChange' event handler and
  // set the parent state from them.

  return (
    <form>
      <input 
        type="text" 
        value={prop.filterText}
        placeholder="Search..."
        onChange={(event) => prop.onFilterTextChange(event.target.value)}
      />
      <label>
        <input type="checkbox"/>
        Only show products in stock.
      </label>
    </form>
  );
}

function FilterableProductTable() {

  const [filterText, setFilterText] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Pass 'filterText' and 'inStockOnly' to 'ProductTable' and
  // 'SearchBar' as props

  const PRODUCTS: Product[] = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ];

  return (
    <>
      <SearchBar 
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable 
        products={PRODUCTS} 
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  )
}

export default FilterableProductTable;