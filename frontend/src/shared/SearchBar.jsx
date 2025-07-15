// import React, { useRef } from 'react';
// import './search-bar.css';
// import { Col, Form, FormGroup } from 'reactstrap';
// import { BASE_URL } from './../utils/config';
// import { useNavigate } from 'react-router-dom';

// const SearchBar = () => {
//   const locationRef = useRef('');
//   const checkInRef = useRef('');
//   const checkOutRef = useRef('');
//   const maxGroupSizeRef = useRef(0);
//   const navigate = useNavigate();

//   // ✅ Make this async to use await
//   const searchHandler = async () => {
//     const location = locationRef.current.value;
//     const checkIn = checkInRef.current.value;
//     const checkOut = checkOutRef.current.value;
//     const maxGroupSize = maxGroupSizeRef.current.value;

//     if (
//       location === '' ||
//       checkIn === '' ||
//       checkOut === '' ||
//       maxGroupSize === ''
//     ) {
//       return alert('All fields are required!');
//     }

//     // ✅ Fixed template string, no line break
//     const res = await fetch(
//       `${BASE_URL}/tours/search/getTourBySearch?city=${location}&maxGroupSize=${maxGroupSize}`
//     );

//     // ✅ Optional: handle response, navigate, etc.
//     if (!res.ok) {
//       return alert('Something went wrong');
//     }

//     const result = await res.json();
//     console.log(result);

//     // Example: navigate somewhere if needed
//     // navigate(`/searched-tours?city=${location}&maxGroupSize=${maxGroupSize}`);
//   };

//   return (
//     <Col lg="12">
//       <div className="search__bar">
//         <Form className="d-flex align-items-center gap-4">
//           {/* Location */}
//           <FormGroup className="d-flex gap-3 form__group form__group-fast">
//             <span>
//               <i className="ri-map-pin-line"></i>
//             </span>
//             <div>
//               <h6>Location</h6>
//               <input
//                 type="text"
//                 placeholder="Where are you going?"
//                 ref={locationRef}
//               />
//             </div>
//           </FormGroup>

//           {/* Check-in */}
//           <FormGroup className="d-flex gap-3 form__group form__group-fast">
//             <label
//               htmlFor="checkin"
//               className="d-flex align-items-center gap-2 calendar-label"
//             >
//               <i className="ri-calendar-line calendar__icon"></i>
//               <div>
//                 <h6>Check-in</h6>
//                 <input type="date" id="checkin" ref={checkInRef} />
//               </div>
//             </label>
//           </FormGroup>

//           {/* Check-out */}
//           <FormGroup className="d-flex gap-3 form__group form__group-fast">
//             <label
//               htmlFor="checkout"
//               className="d-flex align-items-center gap-2 calendar-label"
//             >
//               <i className="ri-calendar-check-line calendar__icon"></i>
//               <div>
//                 <h6>Check-out</h6>
//                 <input type="date" id="checkout" ref={checkOutRef} />
//               </div>
//             </label>
//           </FormGroup>

//           {/* No. of Travellers */}
//           <FormGroup className="d-flex gap-3 form__group form__group-last">
//             <span>
//               <i className="ri-group-line"></i>
//             </span>
//             <div>
//               <h6>No. of Travellers</h6>
//               <input type="text" placeholder="0" ref={maxGroupSizeRef} />
//             </div>
//           </FormGroup>

//           {/* Search Icon */}
//           <span className="search__icon" type="submit" onClick={searchHandler}>
//             <i className="ri-search-line"></i>
//           </span>
//         </Form>
//       </div>
//     </Col>
//   );
// };

// export default SearchBar;


import React, { useRef } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { BASE_URL } from './../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const locationRef = useRef('');
  const dateRef = useRef('');
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const date = dateRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === '' || date === '' || maxGroupSize === '') {
      return alert('All fields are required!');
    }

    const res = await fetch(
      `${BASE_URL}/tours/search/getTourBySearch?city=${encodeURIComponent(
        location
      )}&maxGroupSize=${maxGroupSize}`
    );
     
    //&date=${date}

    if (!res.ok) {
      return alert('Something went wrong');
    }

    const result = await res.json();
    console.log(result);

    navigate(
      `/tours/search?city=${location}&maxGroupSize=${maxGroupSize}`,
      { state: result.data }
    );
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          {/* Location */}
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>

          {/* Date */}
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span
              onClick={() => dateRef.current.showPicker()}
              style={{ cursor: 'pointer' }}
            >
              <i className="ri-calendar-line calendar__icon"></i>
            </span>
            <div>
              <h6>Date</h6>
              <input type="date" id="date" ref={dateRef} />
            </div>
          </FormGroup>

          {/* No. of Travellers */}
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>No. of Travellers</h6>
              <input type="text" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>

          {/* Search Icon */}
          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
