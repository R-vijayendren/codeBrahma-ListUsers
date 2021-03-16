import { useState, useEffect } from "react";

// styles
import styles from "./App.module.scss";

// components
import Card from "./components/Card/Card";
import Loader from "./components/Loader/Loader";
// import Pagination from "custom-react-pagination";

import Pagination from "./components/PaginationWithCSS/Pagination";

const App = () => {
  const [users, setUsers] = useState([]); // state to store user.
  const [isLoading, setIsLoading] = useState(false); // loading state.
  const [error, setError] = useState(""); // error status message.
  const [currentPage, setCurrentPage] = useState(1); // initial page number to start.
  const [userPerPage, setUserPerPage] = useState(10); // initial number of users per page to start.

  // code to effect only when currentPage and userPerPage changed.
  useEffect(() => {
    let cleanUp = false;
    if (!cleanUp) {
      setIsLoading(true);
      // getting user data function.
      const getUserData = () => {
        fetch(
          `https://randomuser.me/api/?page=${currentPage}&results=${userPerPage}&seed=abc&inc=name,picture`
        )
          .then((response) => response.json())
          .then((data) => {
            setUsers(data.results); // setting the results array of user to the user state
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            setError(error.message); // setting the error message to the error state
          });
      };
      getUserData();
    }
    return () => {
      cleanUp = true;
      setIsLoading(false);
      setError("");
    }; // cleaning of effecting function
  }, [currentPage, userPerPage]);

  return (
    <div className={styles.appContainer}>
      {/* Header */}
      <header className={styles.headerTxt}>List of User's.</header>
      {/* Error Status */}
      {error && <div className={styles.errorContainer}>{error}</div>}
      {/* Custom Loader when isLoading state is true */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.listContainer}>
          {users.map((user, index) => {
            const imgUrl = user.picture.medium;
            // destructing of object
            const { title, first, last } = user.name;
            // can also concat by const fullname = title + ' ' + first + ' ' + last
            const fullName = `${title} ${first} ${last}`;
            return (
              <div key={index}>
                {/* Custom Card */}
                <Card
                  imgURL={imgUrl}
                  name={fullName}
                  // optional properties
                  cardHeight="200px" // default height 200px
                  cardWidth="200px" // default width 100px
                />
              </div>
            );
          })}
        </div>
      )}
      {/* Footer */}
      <footer className={styles.footerContainer}>
        {/* Custom Pagination */}
        <Pagination
          // current/initial page number, which can be changed
          page={currentPage}
          // dispatcher to set the current page number
          onPageChange={setCurrentPage}
          // initial no.of users to be rendered per page
          itemsPerPage={userPerPage}
          // dispatcher to set the no.of users per page
          setItemsPerPage={setUserPerPage}
          // optional properties
          morePrevBtnLabel="&lt;&lt;"
          moreNextBtnLabel="&gt;&gt;"
          totalItems={500} // for total number of items (default to 50 items)
          pageNumberLimit={5} // for number of pageNumbers in the page controller (default to 5 page numbers)
          borderColor="#fff" // for custom border color of pagination (default color "#fff" which is white color)
          labelColor="#fff" // for custom label on button color (default color "#fff" which is white color)
          itemsInputLabel="User's Per Page" // for custom label on itemsNumber input field (default label "Items Per Page")
        />
      </footer>
    </div>
  );
};

export default App;
