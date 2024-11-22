### Introduce

Implement infinite scroll and searchable features using ReactJS and Typescript.

### Install and run the project

install: `npm install`
run application: `npm start`

### Result

Result at homepage: http://localhost:3000

### Test

    1. Infinite scroll:
    -   When scrolling to the last products (limit = 20), it fetches 20 more products. You can check the    products array in the console, where the updated array with new products will be visible.
        When there is no more data, it fetches the remaining data
    ![infinite scroll](image.png)
    -   there are no warnings about duplicated products
    -   show "loading..." when fetching data
    ![show loading](image-1.png)
    2. Searchable
    -   The app fetches related data 800ms after user finish typing
    -   Infinite scroll can still be used after fetching new data
    -   The updated products array can be checked in the console
    -   there are no warnings about duplicated products
    ![search](image-2.png)
