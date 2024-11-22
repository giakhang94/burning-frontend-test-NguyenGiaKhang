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
    ![image](https://github.com/user-attachments/assets/e4358089-2c81-4ddd-9c45-8e4da9120938)
    -   there are no warnings about duplicated products
    -   show "loading..." when fetching data
    ![image](https://github.com/user-attachments/assets/f19468f2-afa5-4bf4-ad4b-ab9384eb45b5)

    2. Searchable
    -   The app fetches related data 800ms after user finish typing
    -   Infinite scroll can still be used after fetching new data
    -   The updated products array can be checked in the console
    -   there are no warnings about duplicated products
    ![image](https://github.com/user-attachments/assets/c4fb0746-1a05-4691-a74b-4835a17e985d)

