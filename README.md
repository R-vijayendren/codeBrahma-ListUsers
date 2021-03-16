## Custom Pagination Component

In this project directory, we are having a sample for custom pagination component.

```javascript
<Pagination
  // current/initial page number, which can be changed
  page={currentPage}
  // dispatcher to set the current page number
  onPageChange={setCurrentPage}
  // initial no.of users to be rendered per page
  itemsPerPage={userPerPage}
  // dispatcher to set the no.of users per page
  setItemsPerPage={setUserPerPage}
  // below are optional properties

  totalItems={500} // for total number of items (default to 50 items)
  pageNumberLimit={10} // for number of pageNumbers in the page controller (default to 5 page numbers)
  borderColor="#000000" // for custom border color of pagination (default color "#fff" which is white color)
  labelColor="#000000" // for custom label on button color (default color "#fff" which is white color)
/>
```

In the above sample, the currentpage and userPerPage has to be managed in parent component. Like below,

```javascript
const [currentPage, setCurrentPage] = useState(1); // initial page number to start.
const [userPerPage, setUserPerPage] = useState(10); // initial number of users per page to start.
```

In this project, there are two Pagination component of same logic but different stylesheet's. You can use appropriate component by the css usage or scss usage.

## Available Scripts

In the project directory, you can run:

### `npm install`

Install's the package dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
